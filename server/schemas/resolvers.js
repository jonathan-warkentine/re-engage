const {AuthenticationError} = require("apollo-server-express");
const {Reader, Passage, SingleReading} = require("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
  Query: {
    readers: async () => {
      return await Reader.find({}).populate("passages");
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
      return Passage.find().populate("providedBy");
    },

    passage: async (parent, {passageId}) => {
      return Passage.findOne({_id: passageId}).populate("providedBy");
    },

    myPassages: async (parent, args, context) => {
      if (context.user) {
        return Passages.find({providedBy: context.user._id}).populate(
          "providedBy"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    singleUsersPassages: async (parent, {readerId}) => {
      return await Passage.find({providedBy: readerId}).populate("providedBy");
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

    // THIS METHOD DOES WORK, without the "if context"
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

    // THIS METHOD DOES WORK, without the "if context"
    updatePassage: async (parent, args, context) => {
      if (context.user) {
        return await Passage.findOneAndUpdate(
          // line below will need to change to 'CONTEXT._id' when we 'get there', it's an ARG for early testing only
          {_id: args._id},
          {
            $set: {
              title: args.title,
              fullBody: args.fullBody,
            },
          },
          {returnDocument: "after"}
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // 'providedBy' below could/should be from the 'context._id', when that's ready to go
    addPassage: async (parent, {title, providedBy, fullBody}) => {
      const newPassage = await Passage.create({
        title: title,
        providedBy: providedBy,
        fullBody: fullBody,
      });
      console.log(newPassage);
      await Reader.findByIdAndUpdate(providedBy, {
        $push: {passages: {passageId: newPassage._id}},
      });
    },

    // 'providedBy' below could/should be from the 'context._id', when that's ready to go
    deletePassage: async (parent, {_id}) => {
      return await Passage.deleteOne({_id: _id});
    },
  },
};

module.exports = resolvers;
