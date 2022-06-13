const {Schema, model} = require("mongoose");
const { sentenceSchema, Sentence } = require("./Sentence");
const { wordSchema, Word } = require('./Word');
const NLPCloudClient = require('nlpcloud');
const nlpCloudClientKey = '4dbf7d91e72a84f9e3eeeabdf829985539a05fd0';

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
  const nlpCloudClient = new NLPCloudClient('en_core_web_lg', nlpCloudClientKey);
  try {
    const response = await nlpCloudClient.dependencies( fullText );
    return response.data.words;
  } catch (error) {
    console.error(error.response.status);
    console.error(error.response.data.detail);
    return error;
  }
}

passageSchema.methods.buildWords = function ( nlpResults ) {
  this.words = nlpResults.map( word => new Word( {text: word.text, partOfSpeech: word.tag} ) );
}

passageSchema.methods.buildSentences = function ( words = this.words ) {
  let currentSentence = new Sentence( {key: 0} );

  words.forEach( word => {
      currentSentence.pushWord( word );

      // if the word/char is sentence-ending punctuation
      // trigger new sentence iteration
      if (word.text.match(/[.!?\\-]/)) {
          this.sentences.push(currentSentence);
          currentSentence = new Sentence( {key: this.sentences.length} );
      }
  }); 
}

passageSchema.methods.populateBlanks = function ( sentences = this.sentences, blankrate = 8 ) { // blankrate is the ratio of words/blanks to generate
  this.blankedSentences = sentences.map ( sentence => {
      // if (sentence.length > blankRate) {
      //     TODO: separate alogorithm for longer sentences? can probably consolidate in the future
      // }

      let blankCount = 0;
      sentence.words.forEach( word => {
        // avoiding duplicate blank words
        if (sentence.words.findIndex( w => w.text === word.text ) === word.key) {
          if (word.checkPosSetBlank([/vb$/i, /nn/i, /vbn$/i])) { // note that this is a mutative method called on each word
            blankCount++;
          }
        }
      });

      return sentence;
  });

  return this.blankedSentences;
}

const Passage = model("Passage", passageSchema);

module.exports = {Passage, passageSchema};
