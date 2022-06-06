module.exports = class Word {
    constructor (text, partOfSpeech) {
        this.key; // cannot set until words are contextualized within sentences
        this.text = text;
        this.partOfSpeech = partOfSpeech;
        this.display = true;
    }

    checkPosSetBlank ( regex ) {
        if (this.partOfSpeech.match( regex )) {
            this.display = false;
            return true;
        }

        return false; // returns false if criteria test fails
    }
}