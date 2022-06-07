const {Schema, model} = require("mongoose");

const wordSchema = new Schema({
    key: {
      type: Number,
      unique: true
    },
    text: {
      type: String,
      default: ''
    },
    partOfSpeech: {
      type: String
    },
    display: {
      type: Boolean
    }
});

wordSchema.methods.checkPosSetBlank = function ( regex ) {
    if (this.partOfSpeech.match( regex )) {
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