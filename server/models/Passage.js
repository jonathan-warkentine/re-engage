const {Schema, model} = require("mongoose");
// const bcrypt = require("bcrypt");

const passageSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  providedBy: {
    type: Schema.Types.ObjectId,
    ref: "Reader",
  },
  fullBody: {
    type: String,
    required: true,
    // maxlength: 500,
  },
  splitBody: {
    type: Array,
    required: false,
  },
});

const Passage = model("Passage", passageSchema);

module.exports = Passage;
