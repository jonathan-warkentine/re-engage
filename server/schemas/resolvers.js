const {AuthenticationError} = require("apollo-server-express");
const {Reader, Passage} = require("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
  Query: {
    readers: async () => {
      return Reader.find();
    },

    reader: async (parent, {readerId}) => {
      return Reader.findOne({_id: readerId});
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return Reader.findOne({_id: context.user._id});
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    passages: async () => {
      return Passage.find();
    },

    passage: async (parent, {passageId}) => {
      return Passage.findOne({_id: passageId});
    },

    myPassages: async (parent, args, context) => {
      if (context.user) {
        return Passages.find({providedBy: context.user._id});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    singleUsersPassages: async (parent, {readerId}) => {
      return Passage.find({providedBy: readerId});
    },
  },

  Mutation: {
    addReader: async (parent, {name, email, password}) => {
      const reader = await Reader.create({name, email, password});
      const token = signToken(reader);

      return {token, reader};
    },
    login: async (parent, {email, password}) => {
      const reader = await Reader.findOne({email});

      if (!reader) {
        throw new AuthenticationError("No Reader with this email found!");
      }

      const correctPw = await reader.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(reader);
      return {token, reader};
    },

    removeReader: async (parent, args, context) => {
      if (context.user) {
        return Reader.findOneAndDelete({_id: context.user._id});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
