const {AuthenticationError} = require("apollo-server-express");
const {Passage, Reader} = require("../../models");

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
            return Passage.find({author: context.user._id}).populate(
              "author"
            );
          }
          throw new AuthenticationError("You need to be logged in!");
        },
    
        passagesByAuthor: async (parent, {readerId}) => {
          return await Passage.find({author: readerId}).populate("author");
        }
    },

    Mutation: {

        addPassage: async (parent, {title, authorId, fullText}) => {
          const newPassage = new Passage({title, author: authorId, fullText});
          await newPassage.build(fullText);
          await newPassage.save();
          await newPassage.populate("author");
          
          const author = await Reader.findByIdAndUpdate(authorId, {
            $push: {
              passages: {
                _id: newPassage._id
              }
            },
          });

          return newPassage;
        },

        updatePassage: async (parent, {_id, title, fullText}, context) => {
          if (context.user) {
            return await Passage.findOneAndUpdate(
              // line below will need to change to 'CONTEXT._id' when we 'get there', it's an ARG for early testing only
              {_id},
              {
                $set: {
                  title,
                  fullText,
                },
              },
              {new: true}
            );
          }
          throw new AuthenticationError("You need to be logged in!");
        },

        deletePassage: async (parent, {_id}) => {
          return await Passage.deleteOne({_id});
        },
    }
}

module.exports = passageResolvers;