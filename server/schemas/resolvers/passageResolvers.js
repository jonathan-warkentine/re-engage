const {AuthenticationError} = require("apollo-server-express");
const {Passage, Reader} = require("../../models");
const {Session} = require("../../models/Session");

const passageResolvers = {
  Query: {
    passage: async (parent, {passageId}) => {
      return Passage.findOne({_id: passageId}).populate("author");
    },

    allPassages: async () => {
      return Passage.find().populate("author");
    },

    myPassages: async (parent, args, context) => {
      if (context.user) {
        return Passage.find({author: context.user._id}).populate("author");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    passagesByAuthor: async (parent, {readerId}) => {
      return await Passage.find({author: readerId}).populate("author");
    },
  },

  Mutation: {
    addPassage: async (parent, {title, authorId, fullText}) => {
      const newPassage = new Passage({title, author: authorId, fullText});
      await newPassage.build(fullText);
      await newPassage.save();
      await newPassage.populate("author");

      await Reader.findByIdAndUpdate(authorId, {
        $push: {
          passages: {
            _id: newPassage._id,
          },
        },
      });

      return newPassage;
    },

    updatePassage: async (parent, {passageId, title, fullText}) => {
      return await Passage.findOneAndUpdate(
        {_id: passageId},
        {
          $set: {
            title: title,
            fullText: fullText,
          },
        },
        {new: true}
      );
    },

    deletePassage: async (parent, {passageId}) => {
      await Session.deleteMany({passage: passageId});
      return await Passage.deleteOne({_id: passageId});
    },
  },
};

module.exports = passageResolvers;
