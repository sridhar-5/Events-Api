const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250,
  },
  email: {
    type: String,
    required: true,
    //can add a regex here to match
    unique: true,
  },
  Phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        if (v.length == 10) {
          return true;
        } else {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

//method to generating a jwt token
UserSchema.methods.GenerateJwtToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET_KEY
  );
  return token;
};
//creating a model for mongo Schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
