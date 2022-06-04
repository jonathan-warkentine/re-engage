const {Schema, model} = require("mongoose");
// const bcrypt = require("bcrypt");

const passageSchema = new Schema({
  passageId: {
    type: Number,
    required: false,
    length: 3
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  providedBy: {
    type: Number,
    required: true,
    length: 3,
  },
  fullBody: {
    type: String,
    required: true,
    maxlength: 500,
  },
  splitBody: {
    type: Array,
    required: false
  }
});

const Passage = model("Passage", passageSchema);

module.exports = Passage;
