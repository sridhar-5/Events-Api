const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

function DBConnect() {
  const MongoConnect = mongoose.connect(
    `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@eventsapp.fipzb.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );

  MongoConnect.then(() => {
    console.log("Connection to MongoDB established successfully..!!");
  });

  MongoConnect.catch((err) => {
    console.log("Error while connecting to MongoDB..!!");
    console.log(err);
  });
}

module.exports = DBConnect;
