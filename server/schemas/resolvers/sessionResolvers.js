const {Session, Reader} = require("../../models");

const sessionResolvers = {
    Query: {
        session: async (_, {sessionId}) => {
            return await Session.findOne({
              _id: sessionId,
            }).populate("passage");
        },
        
        allSessions: async () => {
            return await Session.find({}).populate("passage");
        },

        mySessions: async (_, args, context) => {
            return await Session.findMany({
                readerId: context.user._id
            }).populate("passage");
        },
    },

    Mutation: {
        addSession: async (parent, {readerId, passageId}, context) => {
            
            // TODO: ONCE FRONT END IS SETUP, USE CONTEXT, AND TAKE OUT READER_ID
            const newsession = await Session.create({
              passage: passageId,
              readerId: readerId
            });
            await newsession.populate("passage");
      
            const updatedReader = await Reader.findByIdAndUpdate(readerId, {
              $push: {sessions: newsession},
            });
      
            return newsession;
      
        },

        incrementResumeAt: async (parent, {sessionId}) => {
            return await Session.findByIdAndUpdate(
              {_id: sessionId},
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

module.exports = sessionResolvers;