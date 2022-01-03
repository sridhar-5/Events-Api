const Express = require("express");
const router = Express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

router.post("/", async (request, response) => {
  // check if the user is already there in the data base
  const CheckIfUserIsAlreadyRegistered = await User.findOne({
    username: request.body.username,
  });

  if (CheckIfUserIsAlreadyRegistered)
    return response
      .status(400)
      .send("User Already Exists. Please Try to Login..!");

  const CreateUserInstance = new User({
    Name: request.body.Name,
    email: request.body.email,
    username: request.body.username,
    password: request.body.password,
    Phone: request.body.Phone,
  });

  //encrypting the user password before saving to the database
  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(CreateUserInstance.password, salt);

  // reassigning the hashed password in the place of the password
  CreateUserInstance.password = HashedPassword;

  //save into the database
  const UserRegistered = await CreateUserInstance.save();

  response.status(200).send("Regitration Successful. Please Login");
});

module.exports = router;
