const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  votes: [SchemaTypes.ObjectId],
});

module.exports = model("User", UserSchema);
