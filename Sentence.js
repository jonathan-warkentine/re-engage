export default class Sentence {
    constructor ( nlpResults ) {
        this.words = nlpResults.map( sentence => {
            return sentence.map( ({text, tag}, wordIndex) => {
                return {
                    key: wordIndex,
                    text,
                    partOfSpeech: tag,
                    display: true
                }
            });
        });
    }    
}