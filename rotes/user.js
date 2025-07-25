// your router file
const express = require("express");
const user = express.Router();
const {usercntrl,showmoviesuser,searchmovieuser,likemovie,reviewmovie,dltreview} = require("../cntlr/usercntrl");  // no destructuring
user.post("/user", usercntrl);
user.get("/user/show",showmoviesuser)
user.get("/user/:smovie",searchmovieuser)
user.post("/user/movies/like/:title",likemovie)
user.post("/user/movie/review/:moviename",reviewmovie)

user.delete("/movie/:movieId/review/:reviewId", dltreview)

module.exports = user;
 