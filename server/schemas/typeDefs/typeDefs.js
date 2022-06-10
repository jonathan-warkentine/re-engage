const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type Reading {
    _id: ID
    readerId: ID
    passage: Passage
    resumeAt: Int
  }

  type Reader {
    _id: ID
    name: String
    email: String
    password: String
    readings: [Reading]
  }

  type Word {
    key: Int
    partOfSpeech: String
    text: String
    display: Boolean
  }

  type Sentence {
    key: Int
    words: [Word]
    text: String
  }
  
  input WordInput {
    key: Int
    partOfSpeech: String
    text: String
    display: Boolean
  }

  input SentenceInput {
    key: Int
    words: [WordInput]
    text: String
  }

  type Passage {
    _id: ID
    title: String
    providedBy: Reader
    fullText: String
    words: [Word]
    sentences: [Sentence]
    blankedSentences: [Sentence]
  }

  type Auth {
    token: ID!
    reader: Reader
  }

  type Query {
    reader (readerId: ID!): Reader
    readers: [Reader]
    me: Reader
    passage (passageId: ID!): Passage
    passages: [Passage]
    myPassages: [Passage]
    passagesByAuthor (providedBy: ID!): [Passage]
    reading (readingId: ID!): Reading
    readings: [Reading]
    myReadings: [Reading]
  }

  type Mutation {
    addReader(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateReader(_id: ID!, name: String, email: String, password: String): Reader
    removeReader: Reader
    addPassage(title: String, providedBy: ID, fullText: String): Passage
    updatePassage(_id: ID!, title: String, fullText: String): Passage
    deletePassage(_id: ID!): Passage
    addReading (readerId: ID!, passageId: ID!): Reading
    incrementResumeAt(readingId: ID!): Reading
  }
`;

module.exports = typeDefs;