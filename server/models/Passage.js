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
  providedBy: {
    type: Schema.Types.ObjectId,
    ref: "Reader",
  },
  fullBody: {
    type: String,
    required: true,
    // maxlength: 500,
  },
  splitBody: {
    type: Array,
  },
  splitBodyBlanks: {
    type: Array,
  },
  words: {
    type: [wordSchema]
  },
  sentences: {
    type: [sentenceSchema]
  }
});

passageSchema.methods.build = async function ( fullBody ) {
  const nlpResults = await this.processNLP( fullBody );
  this.buildWords ( nlpResults );
  this.buildSentences( this.words );
  this.populateBlanks( this.sentences );
}

passageSchema.methods.processNLP = async function ( fullBody = this.fullBody ) {
  const nlpCloudClient = new NLPCloudClient('en_core_web_lg', nlpCloudClientKey);
  try {
    const response = await nlpCloudClient.dependencies( fullBody );
    return response.data.words;
  } catch (error) {
    console.error(error.response.status);
    console.error(error.response.data.detail);
    return error;
  }
}

passageSchema.methods.buildWords = function ( nlpResults ) {
  this.words = nlpResults.map( word => new Word( {text: word.text, partOfSpeech: word.tag, display: false} ) );
}

passageSchema.methods.buildSentences = function ( words = this.words ) {
  let currentSentence = new Sentence( {key: 0} );

  words.forEach( word => {
      currentSentence.pushWord( word );

      // if the word/char is sentence-ending punctuation
      // trigger new sentence iteration
      if (word.text.match(/[.!?\\-]/)) {
          this.splitBody.push(currentSentence);
          currentSentence = new Sentence( {key: this.splitBody.length} );
      }
  }); 
}

passageSchema.methods.populateBlanks = function ( sentences = this.splitBody, blankrate = 8 ) { // blankrate is the ratio of words/blanks to generate
  this.splitBodyBlanks = sentences.map ( sentence => {
      // if (sentence.length > blankRate) {
      //     TODO: separate alogorithm for longer sentences? can probably consolidate in the future
      // }

      let blankCount = 0;
      sentence.words.forEach( word => {
          word.checkPosSetBlank(/vb/i)? blankCount++: null;
          return word;
      });

      return sentence;
  });

  return this.splitBodyBlanks;
}

const Passage = model("Passage", passageSchema);

module.exports = Passage;
