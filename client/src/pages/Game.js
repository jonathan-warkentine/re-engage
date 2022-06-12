import React, { useEffect, useState } from "react";
import { Container, Text, Button, Progress, Grid, Spacer, Card, Row, Col } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import '../styles/Bucket.css';
import blueleather from '../images/blueleather.jpg';

import { shuffleArray } from '../utils/utils';

function Game ( _ ) { // TODO: switch to props 


  const props = {
    "_id": "62a56d16a3a0488f96ee0f3f",
    "readerId": "62a56cbd862807c3b739346d",
    "passage": {
      "title": "John 1",
      "fullText": "In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made. In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it.\n\nThere was a man sent from God whose name was John. He came as a witness to testify concerning that light, so that through him all might believe. He himself was not the light; he came only as a witness to the light.\n\nThe true light that gives light to everyone was coming into the world. He was in the world, and though the world was made through him, the world did not recognize him. He came to that which was his own, but his own did not receive him. Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God— children born not of natural descent, nor of human decision or a husband’s will, but born of God.\n\nThe Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
      "_id": "62a56ccb862807c3b7393470",
      "author": {
        "_id": "62a56cbd862807c3b739346d"
      },
      "blankedSentences": [
        {
          "key": 0,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "IN",
              "text": "In",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "NN",
              "text": "beginning",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 4,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "NNP",
              "text": "Word",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NNP",
              "text": "Word",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "IN",
              "text": "with",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": "NNP",
              "text": "Word",
              "display": true
            },
            {
              "key": 17,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 18,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 19,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " In the beginning was the Word , and the Word was with God , and the Word was God ."
        },
        {
          "key": 1,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "He",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 2,
              "partOfSpeech": "IN",
              "text": "with",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "IN",
              "text": "in",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "NN",
              "text": "beginning",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " He was with God in the beginning ."
        },
        {
          "key": 2,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "IN",
              "text": "Through",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "DT",
              "text": "all",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "NNS",
              "text": "things",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "VBD",
              "text": "were",
              "display": false
            },
            {
              "key": 5,
              "partOfSpeech": "VBN",
              "text": "made",
              "display": false
            },
            {
              "key": 6,
              "partOfSpeech": ":",
              "text": ";",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "IN",
              "text": "without",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NN",
              "text": "nothing",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "VBN",
              "text": "made",
              "display": false
            },
            {
              "key": 12,
              "partOfSpeech": "WDT",
              "text": "that",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "VBZ",
              "text": "has",
              "display": false
            },
            {
              "key": 14,
              "partOfSpeech": "VBN",
              "text": "been",
              "display": false
            },
            {
              "key": 15,
              "partOfSpeech": "VBN",
              "text": "made",
              "display": false
            },
            {
              "key": 16,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " Through him all things were made ; without him nothing was made that has been made ."
        },
        {
          "key": 3,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "IN",
              "text": "In",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 3,
              "partOfSpeech": "NN",
              "text": "life",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "DT",
              "text": "that",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "NN",
              "text": "life",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 9,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "DT",
              "text": "all",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "NN",
              "text": "mankind",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " In him was life , and that life was the light of all mankind ."
        },
        {
          "key": 4,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "DT",
              "text": "The",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "VBZ",
              "text": "shines",
              "display": false
            },
            {
              "key": 3,
              "partOfSpeech": "IN",
              "text": "in",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "NN",
              "text": "darkness",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NN",
              "text": "darkness",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "VBZ",
              "text": "has",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "RB",
              "text": "not",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "VB",
              "text": "overcome",
              "display": false
            },
            {
              "key": 13,
              "partOfSpeech": "PRP",
              "text": "it",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " The light shines in the darkness , and the darkness has not overcome it ."
        },
        {
          "key": 5,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "_SP",
              "text": "\n\n",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "EX",
              "text": "There",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 3,
              "partOfSpeech": "DT",
              "text": "a",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "NN",
              "text": "man",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "VBN",
              "text": "sent",
              "display": false
            },
            {
              "key": 6,
              "partOfSpeech": "IN",
              "text": "from",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "WP$",
              "text": "whose",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NN",
              "text": "name",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "NNP",
              "text": "John",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " \n\n There was a man sent from God whose name was John ."
        },
        {
          "key": 6,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "He",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "VBD",
              "text": "came",
              "display": false
            },
            {
              "key": 2,
              "partOfSpeech": "IN",
              "text": "as",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "DT",
              "text": "a",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "NN",
              "text": "witness",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "TO",
              "text": "to",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "VB",
              "text": "testify",
              "display": false
            },
            {
              "key": 7,
              "partOfSpeech": "VBG",
              "text": "concerning",
              "display": false
            },
            {
              "key": 8,
              "partOfSpeech": "DT",
              "text": "that",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "IN",
              "text": "so",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "IN",
              "text": "that",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "IN",
              "text": "through",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": "DT",
              "text": "all",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": "MD",
              "text": "might",
              "display": true
            },
            {
              "key": 17,
              "partOfSpeech": "VB",
              "text": "believe",
              "display": false
            },
            {
              "key": 18,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " He came as a witness to testify concerning that light , so that through him all might believe ."
        },
        {
          "key": 7,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "He",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "PRP",
              "text": "himself",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 3,
              "partOfSpeech": "RB",
              "text": "not",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": ":",
              "text": ";",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "PRP",
              "text": "he",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "VBD",
              "text": "came",
              "display": false
            },
            {
              "key": 9,
              "partOfSpeech": "RB",
              "text": "only",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "IN",
              "text": "as",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "DT",
              "text": "a",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "NN",
              "text": "witness",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "IN",
              "text": "to",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " He himself was not the light ; he came only as a witness to the light ."
        },
        {
          "key": 8,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "_SP",
              "text": "\n\n",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "DT",
              "text": "The",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "JJ",
              "text": "true",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "WDT",
              "text": "that",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "VBZ",
              "text": "gives",
              "display": false
            },
            {
              "key": 6,
              "partOfSpeech": "NN",
              "text": "light",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "IN",
              "text": "to",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "NN",
              "text": "everyone",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 10,
              "partOfSpeech": "VBG",
              "text": "coming",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "IN",
              "text": "into",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "NN",
              "text": "world",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " \n\n The true light that gives light to everyone was coming into the world ."
        },
        {
          "key": 9,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "He",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 2,
              "partOfSpeech": "IN",
              "text": "in",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "NN",
              "text": "world",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "IN",
              "text": "though",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "NN",
              "text": "world",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 11,
              "partOfSpeech": "VBN",
              "text": "made",
              "display": false
            },
            {
              "key": 12,
              "partOfSpeech": "IN",
              "text": "through",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": "NN",
              "text": "world",
              "display": true
            },
            {
              "key": 17,
              "partOfSpeech": "VBD",
              "text": "did",
              "display": false
            },
            {
              "key": 18,
              "partOfSpeech": "RB",
              "text": "not",
              "display": true
            },
            {
              "key": 19,
              "partOfSpeech": "VB",
              "text": "recognize",
              "display": false
            },
            {
              "key": 20,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 21,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " He was in the world , and though the world was made through him , the world did not recognize him ."
        },
        {
          "key": 10,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "He",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "VBD",
              "text": "came",
              "display": false
            },
            {
              "key": 2,
              "partOfSpeech": "IN",
              "text": "to",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "DT",
              "text": "that",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "WDT",
              "text": "which",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "VBD",
              "text": "was",
              "display": false
            },
            {
              "key": 6,
              "partOfSpeech": "PRP$",
              "text": "his",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "JJ",
              "text": "own",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "CC",
              "text": "but",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "PRP$",
              "text": "his",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "JJ",
              "text": "own",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "VBD",
              "text": "did",
              "display": false
            },
            {
              "key": 13,
              "partOfSpeech": "RB",
              "text": "not",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": "VB",
              "text": "receive",
              "display": false
            },
            {
              "key": 15,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " He came to that which was his own , but his own did not receive him ."
        },
        {
          "key": 11,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "CC",
              "text": "Yet",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "IN",
              "text": "to",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "DT",
              "text": "all",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "WP",
              "text": "who",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "VBD",
              "text": "did",
              "display": false
            },
            {
              "key": 5,
              "partOfSpeech": "VB",
              "text": "receive",
              "display": false
            },
            {
              "key": 6,
              "partOfSpeech": "PRP",
              "text": "him",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "IN",
              "text": "to",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "DT",
              "text": "those",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "WP",
              "text": "who",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "VBD",
              "text": "believed",
              "display": false
            },
            {
              "key": 12,
              "partOfSpeech": "IN",
              "text": "in",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "PRP$",
              "text": "his",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": "NN",
              "text": "name",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": "PRP",
              "text": "he",
              "display": true
            },
            {
              "key": 17,
              "partOfSpeech": "VBD",
              "text": "gave",
              "display": false
            },
            {
              "key": 18,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 19,
              "partOfSpeech": "NN",
              "text": "right",
              "display": true
            },
            {
              "key": 20,
              "partOfSpeech": "TO",
              "text": "to",
              "display": true
            },
            {
              "key": 21,
              "partOfSpeech": "VB",
              "text": "become",
              "display": false
            },
            {
              "key": 22,
              "partOfSpeech": "NNS",
              "text": "children",
              "display": true
            },
            {
              "key": 23,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 24,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 25,
              "partOfSpeech": ":",
              "text": "—",
              "display": true
            },
            {
              "key": 26,
              "partOfSpeech": "NNS",
              "text": "children",
              "display": true
            },
            {
              "key": 27,
              "partOfSpeech": "VBN",
              "text": "born",
              "display": false
            },
            {
              "key": 28,
              "partOfSpeech": "RB",
              "text": "not",
              "display": true
            },
            {
              "key": 29,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 30,
              "partOfSpeech": "JJ",
              "text": "natural",
              "display": true
            },
            {
              "key": 31,
              "partOfSpeech": "NN",
              "text": "descent",
              "display": true
            },
            {
              "key": 32,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 33,
              "partOfSpeech": "CC",
              "text": "nor",
              "display": true
            },
            {
              "key": 34,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 35,
              "partOfSpeech": "JJ",
              "text": "human",
              "display": true
            },
            {
              "key": 36,
              "partOfSpeech": "NN",
              "text": "decision",
              "display": true
            },
            {
              "key": 37,
              "partOfSpeech": "CC",
              "text": "or",
              "display": true
            },
            {
              "key": 38,
              "partOfSpeech": "DT",
              "text": "a",
              "display": true
            },
            {
              "key": 39,
              "partOfSpeech": "NN",
              "text": "husband",
              "display": true
            },
            {
              "key": 40,
              "partOfSpeech": "POS",
              "text": "’s",
              "display": true
            },
            {
              "key": 41,
              "partOfSpeech": "NN",
              "text": "will",
              "display": true
            },
            {
              "key": 42,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 43,
              "partOfSpeech": "CC",
              "text": "but",
              "display": true
            },
            {
              "key": 44,
              "partOfSpeech": "VBN",
              "text": "born",
              "display": false
            },
            {
              "key": 45,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 46,
              "partOfSpeech": "NNP",
              "text": "God",
              "display": true
            },
            {
              "key": 47,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " Yet to all who did receive him , to those who believed in his name , he gave the right to become children of God — children born not of natural descent , nor of human decision or a husband ’s will , but born of God ."
        },
        {
          "key": 12,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "_SP",
              "text": "\n\n",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "DT",
              "text": "The",
              "display": true
            },
            {
              "key": 2,
              "partOfSpeech": "NNP",
              "text": "Word",
              "display": true
            },
            {
              "key": 3,
              "partOfSpeech": "VBD",
              "text": "became",
              "display": false
            },
            {
              "key": 4,
              "partOfSpeech": "NN",
              "text": "flesh",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "VBD",
              "text": "made",
              "display": false
            },
            {
              "key": 7,
              "partOfSpeech": "PRP$",
              "text": "his",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "NN",
              "text": "dwelling",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "IN",
              "text": "among",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "PRP",
              "text": "us",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " \n\n The Word became flesh and made his dwelling among us ."
        },
        {
          "key": 13,
          "words": [
            {
              "key": 0,
              "partOfSpeech": "PRP",
              "text": "We",
              "display": true
            },
            {
              "key": 1,
              "partOfSpeech": "VBP",
              "text": "have",
              "display": false
            },
            {
              "key": 2,
              "partOfSpeech": "VBN",
              "text": "seen",
              "display": false
            },
            {
              "key": 3,
              "partOfSpeech": "PRP$",
              "text": "his",
              "display": true
            },
            {
              "key": 4,
              "partOfSpeech": "NN",
              "text": "glory",
              "display": true
            },
            {
              "key": 5,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 6,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 7,
              "partOfSpeech": "NN",
              "text": "glory",
              "display": true
            },
            {
              "key": 8,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 9,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 10,
              "partOfSpeech": "CD",
              "text": "one",
              "display": true
            },
            {
              "key": 11,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 12,
              "partOfSpeech": "JJ",
              "text": "only",
              "display": true
            },
            {
              "key": 13,
              "partOfSpeech": "NNP",
              "text": "Son",
              "display": true
            },
            {
              "key": 14,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 15,
              "partOfSpeech": "WP",
              "text": "who",
              "display": true
            },
            {
              "key": 16,
              "partOfSpeech": "VBD",
              "text": "came",
              "display": false
            },
            {
              "key": 17,
              "partOfSpeech": "IN",
              "text": "from",
              "display": true
            },
            {
              "key": 18,
              "partOfSpeech": "DT",
              "text": "the",
              "display": true
            },
            {
              "key": 19,
              "partOfSpeech": "NNP",
              "text": "Father",
              "display": true
            },
            {
              "key": 20,
              "partOfSpeech": ",",
              "text": ",",
              "display": true
            },
            {
              "key": 21,
              "partOfSpeech": "JJ",
              "text": "full",
              "display": true
            },
            {
              "key": 22,
              "partOfSpeech": "IN",
              "text": "of",
              "display": true
            },
            {
              "key": 23,
              "partOfSpeech": "NN",
              "text": "grace",
              "display": true
            },
            {
              "key": 24,
              "partOfSpeech": "CC",
              "text": "and",
              "display": true
            },
            {
              "key": 25,
              "partOfSpeech": "NN",
              "text": "truth",
              "display": true
            },
            {
              "key": 26,
              "partOfSpeech": ".",
              "text": ".",
              "display": true
            }
          ],
          "text": " We have seen his glory , the glory of the one and only Son , who came from the Father , full of grace and truth ."
        }
      ]
    },
    "resumeAt": 0
  }
  
  const [ sentence, setSentence ] = useState( props.passage.blankedSentences[0] );
  const [ words, setWords ] = useState( props.passage.blankedSentences[0].words );
  const [ resumeAt, setResumeAt ] = useState( props.resumeAt );

  function handleWordSelect(event) {

    // TODO: add logic to check if the button pressed matches a blank
    // once red herring words are added
    console.log()

    const updatedWords = words.map(word => { 
      if (event.target.value == word.key && word.key == words.reduce(((prev, word) => word.display? prev: Math.min(prev, word.key)), 999)) { // we cannot use strict equality here
          return {
          ...word,
          display: true
        }
      }
      return word; 
    });
    
    setWords(updatedWords)
    
  }

  function decrementSentence () {
    if(sentence.key === 0) {
      return;
    }
    const nextSentence = props.passage.blankedSentences.filter(s=>s.key===sentence.key-1);
    setSentence(nextSentence[0]);
    setWords(sentence.words);
  }

  function incrementSentence () {
    if(sentence.key === props.passage.blankedSentences.length-1) {
      return;
    }
    const nextSentence = props.passage.blankedSentences.filter(s=>s.key===sentence.key+1);
    setSentence(nextSentence[0]);
    setWords(sentence.words);
  }
  // useEffect () {  // set to save progress

  // }

  return (
  <Container className="main-game-box">
    <h2>{props.passage.title}</h2>
    
    <Container justify="center">

    <Card css={{ bg: "$black", w: "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text h4 color="white">
            {words.map(word => word.display? word.text: '___').join('  ')}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src={blueleather}
        width="100%"
        height={340}
        objectFit="cover"
        alt="Card image background"
      />
      <Card.Footer
        isBlurred="true"
        css={{
          bgBlur: "#0e1b2b",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Col>

          <Row>
            <Col>
              <h5 color="#000" size={12}>{words.filter(word => !word.display).length ? "Select the correct word." : "Great job!" }</h5>
              <Row justify="space-around" id="word-list">
                <Grid.Container justify="start">
                  {shuffleArray(words.map((word, index) => (
                    word.display? null: 
                    <Button key={index} flat auto ripple rounded color="secondary" onPress={handleWordSelect} value={word.key}>
                      <Text
                        css={{ color: "inherit" }}
                        size={12}
                        weight="bold"
                      >
                        {word.text}
                      </Text>
                    </Button>

                  ))) }
                  

                </Grid.Container>
              </Row>
            </Col>
          </Row>
          <Spacer y={1} />
          <Row><Progress color="secondary" value={(sentence.words.filter(word => !word.display).length-words.filter(word => word.display === false).length)/sentence.words.filter(word => !word.display).length*100} /></Row>
          
          <Spacer y={1} />

          <Row><Progress color="success" value={(sentence.key/props.passage.blankedSentences.length-1)*100} /></Row>
          <Row>
            <Col>
              <Row justify="flex-end">
                <h5 color="#000" size={12}> {sentence.key+1} of {props.passage.blankedSentences.length}</h5>
                <Button.Group ripple flat bordered color="success">
                  <Button auto rounded color="inherit" onPress={decrementSentence}>
                    <Text css={{ color: "inherit" }} size={12} weight="bold">
                      <FontAwesomeIcon icon={faArrowLeftLong} />
                    </Text>
                  </Button>
                  <Button auto rounded color="inherit" onPress={incrementSentence}>
                    <Text css={{ color: "inherit" }} size={12} weight="bold">
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    </Text>
                  </Button>
                </Button.Group>
              </Row>
            </Col>
          </Row>

        </Col>
      </Card.Footer>
    </Card>

    </Container>

  </Container>
  )
};

export default Game;