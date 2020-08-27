const { Schema, model, SchemaTypes } = require("mongoose");

const VoterSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: SchemaTypes.ObjectId,
    },
  },
  {
    _id: false,
  }
);

const VoteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  author: {
    type: VoterSchema,
    required: true,
  },
  voters: [VoterSchema],
});

module.exports.Voter = model("Voter", VoterSchema);
module.exports.Vote = model("Vote", VoteSchema);
