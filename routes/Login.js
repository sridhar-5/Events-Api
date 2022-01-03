const Express = require("express");
const router = Express.Router();
const User = require("../models/Users");
const mongoose = require("mongoose");
import { getAuth } from "firebase/auth";

router.post("/", async (request, response) => {
  //checking the database for the user.
  const CheckUser = await User.findOne({ username: request.body.username });

  //if user record is not available then responds as a bad request
  if (!CheckUser)
    return response.status(400).send("Invalid Username or Password");

  //check if entered password and user password is same
  const PasswordCheck = await bcrypt.compare(
    request.body.password,
    CheckUser.password
  );
  //wrong password case
  if (!PasswordCheck)
    return response.status(400).send("Invalid Username or Password");

  //if both entered username and password are correct then generating a jwt token

  const token = CheckUser.GenerateJwtToken();
  response.header("user-auth-token", token).status(200).send(token);
});

router.post("/LoginUsingOtp", (request, response) => {
  const auth = getAuth();
  firebase.auth().useDeviceLanguage();
});
module.export = router;
