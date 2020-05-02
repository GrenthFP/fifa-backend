const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var Schema = mongoose.Schema;

var shiberSchema = new Schema({
  name: String,
  gender: String,
  price: Number,
  traits: String,
});
var UserSchema = new Schema({
  username: String,
  password: String,
});

var Shiber = mongoose.model("Shiber", shiberSchema);
var User = mongoose.model("User", UserSchema);

var whitelist = [
  "http://localhost:3000",
  "https://admiring-joliot-7ae5fb.netlify.app",
];
app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

app.post("/addShibe", async (req, res) => {
  let { name, price, description, gender, key } = req.body;

  await Shiber.create({
    name: name,
    gender: gender,
    price: price,
    traits: description,
  });

  res.send({ error: false });
});

app.post("/register", async (req, res) => {
  let { username, password, key } = req.body;
  console.log(req.body);

  await User.create({
    username: username,
    password: password,
  });

  res.send({ error: false });
});

app.post("/Login_check", async (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);

  let currentUser = await User.findOne({
    username: username,
    password: password,
  });
  console.log(username);
  console.log(allUsers);
  if (currentUser) {
    res.send({ answer: "Logged in" });
  } else {
    res.send({ answer: "Denied" });
  }
});

app.get("/getShibers", async (req, res) => {
  let allShibers = await Shiber.find();

  res.send({ shiber: allShibers });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
