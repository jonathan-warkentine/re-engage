const {Schema, model} = require("mongoose");

const wordSchema = new Schema({
    key: {
      type: Number,
    },
    text: {
      type: String,
      default: ''
    },
    partOfSpeech: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    }
});

wordSchema.methods.checkPosSetBlank = function ( regexArray ) {
    if ( regexArray.reduce((prev, cur) => prev||this.partOfSpeech.match( cur ), false) ) {
        this.display = false;
        return true;
    }
    return false; // returns false if criteria test fails
}

const Word = model("Word", wordSchema);

module.exports = {
    wordSchema,
    Word
}