const express = require("express");
const app = express();
const DBConnect = require("./config/DBConnect");
const RegisterUser = require("./routes/registerUser");
const FirebaseInit = require("./config/FirebaseInit");

app.use(express.json());
app.use("/api/registerUser", RegisterUser);

DBConnect();
FirebaseInit();

app.get("/", (request, response) => {
  response.status(200).send("Hello World! Welcome to the events Api");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
