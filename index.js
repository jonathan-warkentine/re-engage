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

    return sentenceDetailSplit;    
}

processPassage('this is, a test. you know?!? a great test. The greatest!')
    .then(res => console.log(res))