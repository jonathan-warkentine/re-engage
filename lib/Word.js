module.exports = class Word {
    constructor (text, partOfSpeech) {
        this.key; // cannot set until words are contextualized within sentences
        this.text = text;
        this.partOfSpeech = partOfSpeech;
        this.display = true;
    }
}