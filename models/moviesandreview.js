const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'reviewers' },
  name:{type:String,ref:'reviewers'},
  comment: String,
  rating: Number
});

const movieschema = new mongoose.Schema({
  title: String,
  genre: String,
  duration:String,
   Catogery:String,
   Language: String,
  Year: Number,
  Director:String,
  writers:String,
  Stars:String,
  description: String,
  likes: { type: Number, default: 0 },
  review: [reviewschema] 
});

module.exports = mongoose.model("movie", movieschema);
