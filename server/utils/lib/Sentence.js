module.exports = class Sentence {
    // constructs from an array of 'word' objects
    constructor ( words = null, key ) {
        // cannot set unless all words are present
        this.text = words? words.reduce( ( text, word ) => text+" "+word.text): "";
        this.words = words? words: [];
        this.key = key;
    }    

    pushWord ( word ) {
        word.key = this.words.length;
        this.words.push(word);
        this.text = this.text.concat(' ', word.text);
    }
}