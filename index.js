const findPartsOfSpeech = require('./NLP');

async function processPassage (passage) {

    // TODO: before submitting for NLP, remove duplicative punctuation
    // TODO:  combine consecutive sentences if they are both short ? 

    const sentenceSplit = await findPartsOfSpeech(passage);
    const sentenceDetailSplit = sentenceSplit.map( sentence => {
        return sentence.map( ({text, tag}, wordIndex) => {
            return {
                key: wordIndex,
                text,
                POS: tag,
                display: true
            }
        });
        
    });

    return populateBlanks(sentenceDetailSplit);    
}

function populateBlanks (sentences) {
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



processPassage('this is, a test. you know?!? a great test. The greatest!')
    .then(res => console.log(res))

