const {Schema, model} = require("mongoose");

const readingSchema = new Schema({
  passage: {
    type: Schema.Types.ObjectId,
    ref: "Passage",
  },
  readerId: {
    type: Schema.Types.ObjectId,
    ref: "Reader"
  },
  resumeAt: {
    type: Number,
    default: 0,
  },
});

const Reading = model("Reading", readingSchema);

module.exports = {Reading, readingSchema};