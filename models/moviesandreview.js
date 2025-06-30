const mongoose = require("mongoose");
const { image } = require("../utls/cloudinary");
// const { movie_image } = require("../utls/cloudinary");

const reviewschema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'reviewers' },
  name:{type:String,ref:'reviewers'},
  image:{type:String,ref:"reviewers"},
  comment: String,
  rating: Number
});

const movieschema = new mongoose.Schema({
  title: String,
  genre: String,
  duration:String,
  Catogery:String,
  Language: String,
  year: Number,
  Director:String,
  writers:String,
  Stars:String,
  description: String,
  movie_image:String,
  trailer_link:{
    type:String,
    required:false
  },
  likes: { type: Number, default: 0 },
  review: [reviewschema] 
});

module.exports = mongoose.model("movie", movieschema);
