const {AuthenticationError} = require("apollo-server-express");
const {Reader} = require("../../models");
const {signToken} = require("../../utils/auth");

const readerResolvers = {
  Query: {
    reader: async (parent, {readerId}) => {
      return Reader.findOne({_id: readerId})
      .populate("passages")
      .populate("sessions")
      .populate({
        path: "sessions",
        populate: "passage"
      })
      .populate({
        path: "passages",
        populate: "author"
      })
    },
    
    allReaders: async () => {
      return await Reader.find({})
        .populate("passages")
        .populate("sessions")
        .populate({
          path: "sessions",
          populate: "passage"
        })
        .populate({
          path: "passages",
          populate: "author"
        })
    },

    me: async (parent, args, context) => {
      if (context) { // TODO: change back to context.user
        return await Reader.findOne({_id: "62a3a1401510b88bf96fdd45"}) // TODO: change to context.user._id
          .populate("sessions")
          .populate({
            path: "sessions",
            populate: {
              path: "passage"
            }
          })
          .populate({
            path: "sessions",
            populate: {
              path: "passage",
              populate: "author"
            }
          })
          .populate("passages");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
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

    updateReader: async (parent, args, context) => {
      if (context.user) {
        return Reader.findOneAndUpdate(
          // line below will need to change to 'CONTEXT._id' when we 'get there', it's an ARG for early testing only
          {_id: args._id},
          {
            $set: {
              name: args.name,
              email: args.email,
              password: args.password,
              screenName: args.screenName,
            },
          },
          {returnDocument: "after"}
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeReader: async (parent, args, context) => {
      if (context.user) {
        return Reader.findOneAndDelete({_id: context.user._id});
      }
      throw new AuthenticationError("You need to be logged in!");
    },

  }
}

module.exports = readerResolvers;