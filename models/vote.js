const { Schema, model } = require("mongoose");

const VoterSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String,
  },
});

const VoteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  voters: [VoterSchema],
});

module.exports = model("Vote", VoteSchema);
