var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shiberSchema = new Schema({
  name: String,
  gender: String,
  price: Number,
  traits: String,
});

var Shiber = mongoose.model("Shiber", shiberSchema);

exports.default = Shiber;
