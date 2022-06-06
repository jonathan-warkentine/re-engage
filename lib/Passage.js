const NLPCloudClient = require('nlpcloud');
const Word = require('./Word');
const Sentence = require('./Sentence');

module.exports = class Passage {

    constructor ( text, nlpCloudClientKey = null ) {
        this.text = text;
        this.words;
        this.sentences = []; // unpopulated until .build() method is called
        this.blankedSentences = [];
        this.nlpCloudClientKey = nlpCloudClientKey || '4dbf7d91e72a84f9e3eeeabdf829985539a05fd0';
        this.nlpCloudClient = new NLPCloudClient('en_core_web_lg', this.nlpCloudClientKey);
    }

    async build ( text = this.text ) {

        // TODO: before submitting for NLP, remove duplicative punctuation
        // TODO:  combine consecutive sentences if they are both short ? 
        
        // submit passage for NLP analysis, get list of words
        const nlpResults = await this.processNLP( text );

        // create a scaffold for each word for future manipulation of 'display = true/false' and key values 
        this.buildWords( nlpResults );
        
        // arrange words according to sentences
        this.buildSentences( this.words );
        this.populateBlanks( this.sentences );
    }

    async processNLP ( text = this.text, nlpCloudClient = this.nlpCloudClient ) {
        
        // https://nlpcloud.io/nlp-part-of-speech-pos-tagging-api.html
        // glossary of abbreviations: https://github.com/explosion/spaCy/blob/master/spacy/glossary.py#L16  
        try {
          const response = await nlpCloudClient.dependencies(text);
          return response.data.words;
        } catch (error) {
          console.error(error.response.status);
          console.error(error.response.data.detail);
          return error;
        }
    }

    buildWords ( nlpResults = nlpResults ) {
        this.words = nlpResults.map( word => new Word( word.text, word.tag ) );
    }

    buildSentences ( words = this.words ) {

        let currentSentence = new Sentence( null, 0 );

        words.forEach( word => {
            currentSentence.pushWord( word );

            // if the word/char is sentence-ending punctuation
            // trigger new sentence iteration
            if (word.text.match(/[.!?\\-]/)) {
                this.sentences.push(currentSentence);
                currentSentence = new Sentence( null, this.sentences.length );
            }
        }); 
    }

    populateBlanks ( sentences = this.sentences, blankrate = 8 ) { // blankrate is the ratio of words/blanks to generate
        this.blankedSentences = sentences.map ( sentence => {
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

        return this.blankedSentences;
    }
    
}