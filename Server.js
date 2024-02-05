const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.set("view engine","ejs");   //to tell express the template type so that it can decipher the ejs values
app.use(bodyParser.urlencoded({extended: true})); //to read the post input and turn it into a json object
app.use(express.static("public"));

const username = "Admin-Vidushi";
const password = "Vidushi";
const cluster = "cluster0.vkhf7";
const dbname = "Calendar";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
