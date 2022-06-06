const {Schema, model} = require("mongoose");

const singleReadingSchema = new Schema({
  passage: {
    type: Schema.Types.ObjectId,
    ref: "Passage",
  },
  resumeAt: {
    type: Number,
    default: 0,
  },
});

const SingleReading = model("SingleReading", singleReadingSchema);

module.exports = SingleReading;