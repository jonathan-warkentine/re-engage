const Passage = require('./Passage');

const text = `In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made. In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it.
There was a man sent from God whose name was John. He came as a witness to testify concerning that light, so that through him all might believe. He himself was not the light; he came only as a witness to the light.
The true light that gives light to everyone was coming into the world. He was in the world, and though the world was made through him, the world did not recognize him. He came to that which was his own, but his own did not receive him. Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God— children born not of natural descent, nor of human decision or a husband’s will, but born of God.`

const passage = new Passage(text);
passage.build()
.then(()=> console.log());