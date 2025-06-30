const mongoose = require("mongoose");

const profileschema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image:String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
   
});

const userprofile = mongoose.model("reviewers", profileschema);
module.exports = userprofile;
