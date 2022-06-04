const findPartsOfSpeech = require('./NLP');

async function processPassage (passage) {


    const sentenceSplit = await findPartsOfSpeech(passage);
    const sentenceDetailSplit = sentenceSplit.map( ({text, tag}, index) => {
        return {
            key: index,
            text,
            POS: tag,
            display: true
        }
    });

    console.log(sentenceSplit)
    
    // const sentenceSplit = passage.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|"); //https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
    
    // TODO:  combine consecutive sentences if they are both short ? 


    // const sentenceDetailSplit = sentenceSplit.map((sentence, index) => {

    //     const words = sentence.split(' ').map( async (word, index) => {

    //         const valueNoPunct = word.replace( /[.!?\\-]/, "").replace( /[.!?\\-]/, "").replace( /[.!?\\-]/, ""); // run through several iteration to remove duplicate !! and ??, '?!?' eg

    //         return  {
    //             key: index,
    //             value: word,
    //             valueNoPunct,
    //             display: true,
    //         }
    //     });

    //     return {
    //         key: index,
    //         value: sentence,
    //         words
    //     }
    // }); 

    // return results
}

processPassage('this is, a test. you know?!? a great test. The greatest!');