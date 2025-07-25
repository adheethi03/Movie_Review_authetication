const Movie=require("../models/moviesandreview")
const Profile = require('../models/profile')
const { use } = require("../rotes/user")


const usercntrl= async(req,res)=>
{
   try{
     res.status(200).json({message:"welcome to user daashboard"})
   }
   catch(error)
   {
    res.status(500).json({error:error.message})
   }
}
//show all movies
const showmoviesuser= async(req,res)=>
{
     try{
        const movies=await Movie.find()
        if(!movies||movies.length==0)
        {
            res.status(200).json({message:"no movies found"})
    
        }
        res.status(200).json({
          
                movies: movies
        })
      }  
      catch(error)
      {
        return res.status(500).JSON({message:"Error in fetching",error:error.message})
      }

}
//search movie by name
const searchmovieuser=async(req,res)=>
{
  try{
    const {smovie}=req.params
  const searchedmovie=await Movie.findOne({title:smovie})
  if(!searchedmovie)
  {
    res.status(400).json({message:"movie not found"})
  }
  res.status(200).json({movies:searchedmovie})
  }
  catch(error)
  {
    return res.status(500).json({message:"Error in fetching",error:error.message})
  }
}
//like the movie
const likemovie = async (req, res) => {
  try {
    const { title } = req.params;
    const likedmovie = await Movie.findOne({ title: title });

    if (!likedmovie) {
      return res.status(400).json({ message: "movie not found" });
    }

    likedmovie.likes += 1;
    await likedmovie.save();

    res.status(200).json({ message: "movie liked", likes: likedmovie.likes });
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching", error: error.message });
  }
};

//add review
const reviewmovie=async(req,res)=>
{
  try{
    const {moviename}=req.params
    console.log(moviename)
  const {userid,comment,rating}=req.body
  const foundmovie=await Movie.findOne({title:moviename})
  console.log(foundmovie)
  if(!foundmovie)
  {
    res.status(400).json({message:"movie is not found"})
  }
  const founduser = await Profile.findOne({_id:userid})
  if(!founduser)
  {
    res.status(400).json({message:"user not found"})
  }
  const newreview=
  {
    image:founduser.image || "",
    name:founduser.name,
    comment,
    rating
  }
  console.log(newreview)
  //pushing
  foundmovie.review.push(newreview)
  
  await foundmovie.save()
  res.status(200).json({message:"comment added succesfully"})
  }
   catch(error)
  {
    return res.status(500).json({message:"Error in adding comment",error:error.message})
  }
  
}

  //dlting review
  const dltreview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;

    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Review deleted successfully", updatedMovie: movie });

  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};

module.exports = {usercntrl,showmoviesuser,searchmovieuser,likemovie,reviewmovie,dltreview}
