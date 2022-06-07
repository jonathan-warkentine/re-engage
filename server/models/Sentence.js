const {Schema, model} = require("mongoose");
const {wordSchema} = require('./Word');

const sentenceSchema = new Schema({
    key: {
        type: Number
    },
    text: {
        type: String,
        default: ''
    },
    words: {
        type: [wordSchema]
    }
});

sentenceSchema.methods.pushWord = function ( word ) {
    word.key = this.words.length;
    this.words.push(word);
    this.text = this.text.concat(' ', word.text);
};

const Sentence = model("Sentence", sentenceSchema);

module.exports = {
    sentenceSchema,
    Sentence
};