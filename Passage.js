const NLPCloudClient = require('nlpcloud');
const Word = require('./Word');
const Sentence = require('./Sentence');

export default class Passage {

    constructor (text) {
        this.text = text;
        this.nlpCloudClient = new NLPCloudClient('en_core_web_lg','4dbf7d91e72a84f9e3eeeabdf829985539a05fd0');
        this.passage; // undefined until .build() method is called
    }

    async build (text = this.text) {

        // TODO: before submitting for NLP, remove duplicative punctuation
        // TODO:  combine consecutive sentences if they are both short ? 
        
        // submit passage for NLP analysis
        const nlpResults = await findPartsOfSpeech( text );

        // layer additional data into the results, including s
        const sentences = ( nlpResults );
    
        // this.passage = populateBlanks( sentenceDetailSplit );
        return this.passage;    
    }

    async findPartsOfSpeech (passage = this.passage, nlpCloudClient = this.nlpCloudClient) {
        
        // https://nlpcloud.io/nlp-part-of-speech-pos-tagging-api.html
        // glossary of abbreviations: https://github.com/explosion/spaCy/blob/master/spacy/glossary.py#L16  
        let words;
        try {
          const response = await nlpCloudClient.dependencies(passage);
          words = response.data.words;
        } catch (error) {
          console.error(error.response.status);
          console.error(error.response.data.detail);
          return error;
        }
      
        return sentences;
    }

    groupBySentence () {
        // grouping output by sentences
        let sentences = [[]];
        let sentenceIterator = 0;
        words.forEach( (word, index) => {
          sentences[sentenceIterator].push(word);
          if (word.text.match(/[.!?\\-]/)) {
            sentenceIterator++;
            sentences.push([]); 
          }
        }); 
    }

    
    populateBlanks (sentences) {
        const blankRate = 8; // for every ~8 words, 1 blank
        const blankedSentences = sentences.map ( sentence => {
            // if (sentence.length > blankRate) {
            //     // TODO: separate alogorithm for longer sentences? can probably consolidate in the future
            // }
    
            let blankCount = 0;
            return sentence.map( word => {
                if ( word.POS.match(/vb/i) ) { // set all verbs to display 'false'
                    blankCount++;
                    word.display = false;
                }
                return word;
            });
        });
    
        return blankedSentences;
    }
    
}