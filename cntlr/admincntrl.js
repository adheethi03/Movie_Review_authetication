const Movie = require("../models/moviesandreview")
const Profile=require("../models/profile")

const cloudinary=require('../utls/cloudinary')
const admincntrl= async(req,res)=>
{
    res.status(200).json({message:"welcome to admin daashboard"})
}
//adding movies
const movies=async(req,res)=>
{
    try{
         const file=req.file
 
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path)
    console.log(cloudinaryResponse)
    const{title,genre,year,Language, duration,Director,writers,Stars,Catogery,description,trailer_link}=req.body
    if(!title||!genre)
    {
        return res.status(401).json({message:"genre and title is must"})

    }
    const newmovie= new Movie({
        title,
        genre,
        year,
        duration,
        Catogery,
        Director,
        Stars,
        writers,
        Language,
        description,
        movie_image:cloudinaryResponse.url,
        trailer_link
    })
    await newmovie.save()
   
    return res.status(200).json({message:"Movie added succesfully to the database",movie:newmovie})
    
    }
    catch(error)
    {
         console.error("Error adding movie:", error);
        return res.status(500).json({message:"Error in adding movie",error:error.message})
    }
}
//showing all the movies 
const movieshowing=async(req,res)=>
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
//dlting the movie
const dltmovies=async (req,res)=>
{
    try{
         const {mname}=req.params //getting the movie name
    const dltmovies=await Movie.findOneAndDelete({title:mname})
    if(!dltmovies)
    {
        return res.status(400).json({message:"movie not found"})
    }
    res.status(200).json({message:`movie ${mname} deleted sucessfully`})
    }
    catch(error)
    {
        res.status(500).json({message:"movie can't be deleted",error:error.message})
    }
   
}
//search with name
const searchmovie=async(req,res)=>
{
    try{
        const {smovie}=req.params
        const searchedmovie=await Movie.findOne({title:smovie})
        console.log(smovie)
        if(!searchedmovie)
        {
            res.status(400).json({message:"Movie not found"})
        }
        res.status(200).json({
            
            movies: searchedmovie
        });

    }
    catch(error)
    {
    res.status(400).json({error:error.message})
    }
}
//edit movie
const editmovie = async(req,res)=>
{
    const {emovie}=req.params
    const editmovie=req.body
    console.log(emovie)
    try{
        const updatedmovie=await Movie.findOneAndUpdate({title:emovie},editmovie,{new:true})
        console.log(updatedmovie)
        if(!updatedmovie)
        {
            res.status(400).json({message: `movie ${emovie} is not found`})
        }
        res.status(200).json({message:'Movie edited sucessfully',edited:updatedmovie})
       
    }
     catch(error)
        {
           res.status(500).json({message:"error in editing movie",error:error.message}) 
        }
    } 
        //view all users
    const viewusers = async(req,res)=>
        {
            const suser=await Profile.find()
            if(!suser)
            {
                res.status(400).JSON({message:"user is not found"})
            }
            res.status(200).json({Users:suser})
        }
//search user by id and delete
const usersearchanddlt=async(req,res)=>
{
    try{
         const {searchuser}=req.params
         console.log(searchuser)
     const searcheduser=await Profile.findOneAndDelete({_id:searchuser})
     if(!searcheduser)
     {
        res.status(400).json({message:"user not found"})
     }
     res.status(200).json({message:`user ${searchuser} deleted succesfully`})
    }
    catch(error)
    {
        res.status(500).json({message:"error in deleting",error:error.message})
    }
}
module.exports={movies,admincntrl,movieshowing,dltmovies,searchmovie,editmovie,viewusers,usersearchanddlt}