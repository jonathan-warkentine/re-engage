const {AuthenticationError} = require("apollo-server-express");
const {Passage} = require("../../models");

const passageResolvers = {
    Query: {
        
        passage: async (parent, {passageId}) => {
            return Passage.findOne({_id: passageId}).populate("providedBy");
        },

        passages: async () => {
          return Passage.find().populate("providedBy");
        },
    
        myPassages: async (parent, args, context) => {
          if (context.user) {
            return Passage.find({providedBy: context.user._id}).populate(
              "providedBy"
            );
          }
          throw new AuthenticationError("You need to be logged in!");
        },
    
        passagesByAuthor: async (parent, {readerId}) => {
          return await Passage.find({providedBy: readerId}).populate("providedBy");
        }
    },

    Mutation: {

        addPassage: async (parent, {title, providedBy, fullBody}) => {
            const splitBody = new Passage({title, providedBy, fullBody});
            await splitBody.build(fullBody);
      
            const newPassage = await splitBody.save();
      
            // I'm not sure why we are creating a reading here?
            // const newReading = await Reading.create({
            //   passage: newPassage._id,
            // });
      
            // await Reader.findByIdAndUpdate(providedBy, {
            //   $push: {passages: newReading},
            // });
      
            return await newPassage.populate("providedBy");
        },

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

        deletePassage: async (parent, {_id}) => {
            return await Passage.deleteOne({_id: _id});
        },
    }
}

module.exports = passageResolvers;