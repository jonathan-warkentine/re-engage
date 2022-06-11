const {Schema, model} = require("mongoose");

const sessionSchema = new Schema({
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

const Session = model("Session", sessionSchema);

module.exports = {Session, sessionSchema};