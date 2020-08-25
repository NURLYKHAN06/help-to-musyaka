const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  votes: [String],
});

module.exports = model("User", UserSchema);
