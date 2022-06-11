const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type Session {
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
    sessions: [Session]
    passages: [Passage]
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
  
  type Passage {
    _id: ID
    title: String
    author: Reader
    fullText: String
    words: [Word]
    sentences: [Sentence]
    blankedSentences: [Sentence]
  }

  type Auth {
    token: ID!
    reader: Reader
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

  type Query {
    reader (readerId: ID!): Reader
    allReaders: [Reader]
    me: Reader
    passage (passageId: ID!): Passage
    allPassages: [Passage]
    myPassages: [Passage]
    passagesByAuthor (authorId: ID!): [Passage]
    session (sessionId: ID!): Session
    allSessions: [Session]
    mySessions: [Session]
  }

  type Mutation {
    addReader(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateReader(_id: ID!, name: String, email: String, password: String): Reader
    removeReader: Reader
    addPassage(title: String, authorId: ID, fullText: String): Passage
    updatePassage(_id: ID!, title: String, fullText: String): Passage
    deletePassage(_id: ID!): Passage
    addSession (readerId: ID!, passageId: ID!): Session
    incrementResumeAt(sessionId: ID!): Session
  }
`;

module.exports = typeDefs;