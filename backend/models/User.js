const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  user_pic: String
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
