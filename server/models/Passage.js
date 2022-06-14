const {Schema, model} = require("mongoose");
const { sentenceSchema, Sentence } = require("./Sentence");
const { wordSchema, Word } = require('./Word');
const NLPCloudClient = require('nlpcloud');

// generate cloud client 'buckets'
// TODO: these keys ought to be in the production env
const nlpCloudClientKeys = ['4dbf7d91e72a84f9e3eeeabdf829985539a05fd0', '705328ce2b8ac92c31e908614fa59b7617252186', 'a39ae8cb0d7f77edb6a8526e89903061f9b1dd55', '14daf68bfe3bb4bbd65d68a0cb1d3a5551d2102e', 'b42c9a770431d29d8076a3b77adf8ec31aa1b241', '7204417aa5fe85f72c9050d25f2a96760bf2647a'];
const nlpCloudClients = {
  indexTracker: 0,

  cycleClient() {
      if (this.indexTracker==this.clients.length-1) {
          this.indexTracker = 0;
      }
      else {
          this.indexTracker++;
      }
      return this.indexTracker;
  },

  clients: nlpCloudClientKeys.map( key => new NLPCloudClient('en_core_web_lg', key) ),
}; 

const wait = require('../utils/misc');

const passageSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Reader",
  },
  fullText: {
    type: String,
    required: true,
  },
  words: {
    type: [wordSchema]
  },
  sentences: {
    type: [sentenceSchema]
  },
  blankedSentences: {
    type: [sentenceSchema]
  }
});

passageSchema.methods.build = async function ( fullText ) {
  const nlpResults = await this.processNLP( fullText );
  this.buildWords ( nlpResults );
  this.buildSentences( this.words );
  this.populateBlanks( this.sentences );
}

passageSchema.methods.processNLP = async function ( fullText = this.fullText ) {
  
  // first split into sentences
  const allSentences = fullText.match( /[^\.!\?]+[\.!\?]+/g );

  // recombine into sentence groupings of roughly appropriate length
  const sentenceGroupings = allSentences.reduce( (acc, sentence) => {
    
      // if the newest sentence grouping in our accumulator is greater than the threshold
      // then create a new sentence grouping
      if ( acc[acc?.length-1]?.join(' ').length > 750 ) {
          acc.push([]);
      }

      acc[acc.length-1].push(sentence);

      return acc;

  }, [[]]);

  // combine sentences within a grouping
  const joinedGroupings = sentenceGroupings.map(group => group.join(''));

  //for each sentence grouping, analyze NLP
  const nlpPromises = joinedGroupings.map( async grouping => {
      wait(1000); // giving the server time to breath to avoid 429 response
      try {
          const response = await nlpCloudClients.clients[nlpCloudClients.cycleClient()].dependencies( grouping );
          return response.data.words;

        } catch (error) {
          // console.error(error.response.headers)
          console.error(error.response.status);
          // console.error(error.response.data.detail);
          const delayedRes = await trytryAgain(grouping, (2000));
          return delayedRes;
        }
  });
  
  async function trytryAgain (text, delay) { // recursively cycles through clients until obtains valid results
      
      await wait(delay);

      try {
          const response = await nlpCloudClients.clients[nlpCloudClients.cycleClient()].dependencies( text );
          return response.data.words;
      } catch (error) {
          // console.error(error);
          console.error(error.response.status);
          // console.error(error.response.data.detail);
          return await trytryAgain(text, (delay*2));
      }
  }

  const nlpResults = await Promise.all(nlpPromises);
  const nlpJoinedRes = nlpResults.flat();

  return nlpJoinedRes;
}

passageSchema.methods.buildWords = function ( nlpResults ) {
  this.words = nlpResults.map( word => new Word( {text: word.text, partOfSpeech: word.tag} ) );
}

passageSchema.methods.buildSentences = function ( words = this.words ) {
  let currentSentence = new Sentence( {key: 0} );

  words.forEach( (word, index) => {
      currentSentence.pushWord( word );

      // if the word/char is sentence-ending punctuation
      // trigger new sentence iteration
      if (word.text.match(/[.!?\\-]/)) {
        // if the sentence or combined sentences pass a length threshold, or we're at the end of our words
        if (currentSentence.words.length > 25 || index == words.length-1) {
          // push the completed sentence and start a new sentence
          this.sentences.push(currentSentence);
          currentSentence = new Sentence( {key: this.sentences.length} );
        }
      }
  }); 
}

// blankCap is the ratio of words/blanks to generate, hardcoded for now
passageSchema.methods.populateBlanks = function ( sentences = this.sentences, blankCap = 6 ) {
  this.blankedSentences = sentences.map ( sentence => {
      let blankCount = 0;
      sentence.words.forEach( word => {
        // avoiding duplicate blank words
        if (blankCount < blankCap && sentence.words.findIndex( w => w.text === word.text ) === word.key) {
          if (word.checkPosSetBlank([/vb$/i, /nn/i, /vbn$/i])) { // note that this is a mutative method called on each word
            blankCount++;
          }
        }
      });

      return sentence;
  });

  //

  return this.blankedSentences;
}

const Passage = model("Passage", passageSchema);

module.exports = {Passage, passageSchema};
