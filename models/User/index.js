const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    passwordText: {
      type: String,
      require: true,
    },
    additional_user_data: {},
  },
  { minimize: false }
);

module.exports = User = mongoose.model("user", UserSchema);
