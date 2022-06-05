const NLPCloudClient = require('nlpcloud');

const client = new NLPCloudClient('en_core_web_lg','4dbf7d91e72a84f9e3eeeabdf829985539a05fd0')

// https://nlpcloud.io/nlp-part-of-speech-pos-tagging-api.html
// glossary of abbreviations: https://github.com/explosion/spaCy/blob/master/spacy/glossary.py#L16
// Returns an Axios promise with the results.
// In case of success, results are contained in `response.data`. 
// In case of failure, you can retrieve the status code in `err.response.status` 
// and the error message in `err.response.data.detail`.


async function findPartsOfSpeech (passage) {
  

  // hardcoding for now
  // try {
  //   const response = await client.dependencies(passage);
  // } catch (error) {
  //   console.error(error.response.status);
  //   console.error(error.response.data.detail);
  //   return error;
  // }
  
  // const words = response.data.words;

  const words = [
    { text: 'this', tag: 'DT' },
    { text: 'is', tag: 'VBZ' },
    { text: ',', tag: '.' },
    { text: 'a', tag: 'DT' },
    { text: 'test', tag: 'NN' },
    { text: '.', tag: '.' },
    { text: 'you', tag: 'PRP' },
    { text: 'know', tag: 'VBP' },
    { text: '?', tag: '.' },
    { text: 'a', tag: 'DT' },
    { text: 'great', tag: 'JJ' },
    { text: 'test', tag: 'NN' },
    { text: '.', tag: '.' },
    { text: 'The', tag: 'DT' },
    { text: 'greatest', tag: 'JJS' },
    { text: '!', tag: '.' }
  ];

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

  return sentences;
}

module.exports = findPartsOfSpeech;