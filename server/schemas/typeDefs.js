const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type Reader {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    readers: [Reader]!
    reader(readerId: ID!): Reader
    me: Reader
  }

  type Mutation {
    addReader(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeReader: Reader
  }
`;

module.exports = typeDefs;
