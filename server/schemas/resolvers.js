const {AuthenticationError} = require("apollo-server-express");
const {Reader, Passage, Word, Sentence, SingleReading} = require("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
  Query: {
    readers: async () => {
      return await Reader.find({})
        .populate({
          path: "passages",
          populate: "passage",
        })
        .populate({
          path: "passages.passage",
          populate: "providedBy",
        });
    },

    reader: async (parent, {readerId}) => {
      return Reader.findOne({_id: readerId})
        .populate({
          path: "passages",
          populate: "passage",
        })
        .populate({
          path: "passages.passage",
          populate: "providedBy",
        });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return Reader.findOne({_id: context.user._id})
          .populate({
            path: "passages",
            populate: "passage",
          })
          .populate({
            path: "passages.passage",
            populate: "providedBy",
          });
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

    mySpecificReading: async (parent, {singleReadingId}) => {
      return await SingleReading.findOne({
        _id: singleReadingId,
      }).populate("passage");
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

    incrementResumeAt: async (parent, {singleReadingId}) => {
      const singleReading = await SingleReading.findOne({
        _id: singleReadingId,
      }).populate("passage");
      const prevResume = singleReading.resumeAt;
      const newResumeAt = prevResume + 2;
      return await SingleReading.findByIdAndUpdate(
        {_id: singleReadingId},
        {
          $set: {
            resumeAt: newResumeAt,
          },
        },
        {returnDocument: "after"}
      ).populate("passage");
    },

    // incrementResumeAt: async (parent, {readerId, passageId}) => {
    //   await Reader.findByIdAndUpdate(
    //     {_id: readerId},
    //     {
    //       $set: {"passages.$[el].resumeAt": 3},
    //     },
    //     {
    //       arrayFilters: [{"el.passage": passageId}],
    //       new: true,
    //     }
    //   );
    // },

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
      const splitBody = new Passage({title, providedBy, fullBody});
      await splitBody.build(fullBody);

      const newPassage = await splitBody.save();

      const newSingleReading = await SingleReading.create({
        passage: newPassage._id,
      });

      await Reader.findByIdAndUpdate(providedBy, {
        $push: {passages: newSingleReading},
      });

      return newPassage.populate("providedBy");
    },

    addSplitBody: async (_, args) => {
      const newPassage = await Passage.create(args);
      await Reader.findByIdAndUpdate(args.providedBy, {
        $push: {passages: {passage: newPassage._id}},
      });
      return newPassage;
    },

    // 'providedBy' below could/should be from the 'context._id', when that's ready to go
    deletePassage: async (parent, {_id}) => {
      return await Passage.deleteOne({_id: _id});
    },

    addToCurrentReadings: async (parent, {readerId, passageId}, context) => {
      // ONCE FRONT END IS SETUP, USE CONTEXT, AND TAKE OUT READER_ID
      const newSingleReading = await SingleReading.create({
        passage: passageId,
      });

      const updatedReader = await Reader.findByIdAndUpdate(readerId, {
        $push: {passages: newSingleReading},
      });

      return updatedReader

    },
  },
};

module.exports = resolvers;
