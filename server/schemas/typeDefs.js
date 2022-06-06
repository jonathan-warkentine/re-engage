const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type singleReading {
    passageId: Passage
    resumeAt: Int
  }

  type Reader {
    _id: ID
    name: String
    email: String
    password: String
    screenName: String
    passages: [singleReading]
  }

  type Passage {
    _id: ID
    title: String
    providedBy: Reader
    fullBody: String
    splitBody: [String]
  }

  type Auth {
    token: ID!
    reader: Reader
  }

  type Query {
    readers: [Reader]!
    reader(readerId: ID!): Reader
    me: Reader
    passages: [Passage]
    passage(passageId: ID!): Passage
    myPassages: [Passage]
    singleUsersPassages(providedBy: ID!): [Passage]
  }

  type Mutation {
    addReader(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeReader: Reader
    updateReader(_id: ID!, name: String, email: String, password: String, screenName: String): Reader
    updatePassage(_id: ID!, title: String, fullBody: String): Passage
    addPassage(title: String, providedBy: ID, fullBody: String): Passage
  }
`;

module.exports = typeDefs;
