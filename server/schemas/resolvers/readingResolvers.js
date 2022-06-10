const {Reading, Reader} = require("../../models");

const readingResolvers = {
    Query: {
        reading: async (_, {readingId}) => {
            return await Reading.findOne({
              _id: readingId,
            }).populate("passage");
        },
        
        readings: async () => {
            return await Reading.find({}).populate("passage");
        },

        myReadings: async (_, args, context) => {
            return await Reading.findMany({
                readerId: context.user._id
            }).populate("passage");
        },
    },

    Mutation: {
        addReading: async (parent, {readerId, passageId}, context) => {
            
            // TODO: ONCE FRONT END IS SETUP, USE CONTEXT, AND TAKE OUT READER_ID
            const newreading = await Reading.create({
              passage: passageId,
              readerId: readerId
            });
      
            const updatedReader = await Reader.findByIdAndUpdate(readerId, {
              $push: {readings: newreading},
            });
      
            return newreading;
      
        },

        incrementResumeAt: async (parent, {readingId}) => {
            return await Reading.findByIdAndUpdate(
              {_id: readingId},
              {
                $inc: {
                  resumeAt: 1,
                },
              },
              { new: true }
            ).populate("passage");
        },
    }
}

module.exports = readingResolvers;