const {Schema, model} = require("mongoose");
const { sentenceSchema, Sentence } = require("./Sentence");
const { wordSchema, Word } = require('./Word');
const wait = require('../utils/misc'); 
const nlpCloudClients = require('../config/nlpCloudClients')

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

  // combine sentences within each grouping
  const joinedGroupings = sentenceGroupings.map(group => group.join(''));

  //for each sentence grouping, analyze NLP
  const nlpPromises = joinedGroupings.map( async grouping => {
      wait(1500); // giving the server time to breath to avoid 429 response
      try {
          const response = await nlpCloudClients.fetchClient().dependencies( grouping );
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
          const response = await nlpCloudClients.fetchClient().dependencies( text );
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
        if (currentSentence.words.length > 18 || index == words.length-1) {
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
          if (word.checkPosSetBlank([/nn/i, /vbn$/i])) { // note that this is a mutative method called on each word
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
