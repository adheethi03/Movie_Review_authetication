const user=require("../models/profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup=async(req,res)=>
{
    try//checking user aalready exists or not
    {
        const{name,email,password,role}=req.body
        const exitstinguser=await user.findOne({email})
        if(exitstinguser)
        {
            return res.status(400).json({message:"user aldredy exist"})

        }
        //hashing the password
        const handlepassword=await bcrypt.hash(password,10)
        //new user
        const newuser=new user({
            name,
            email,
            password:handlepassword,
            role,
           
        });
        await newuser.save()
        res.status(201).json({message:"user created sucessfully",user:newuser})
        console.log(newuser); // See what is being saved


    }
    catch(error)
    {
         res.status(500).json({ message: "error in creating profile", error: error.message });
    }
}

//login segemnent
const signin=async (req,res)=>
{
    try{
        const{email,password}=req.body
        //find user is exists
        const euser = await user.findOne({email})
        if(!euser)
        {
            return res.status(400).json({message:"uer not exist"})
        }
        //comparing the user and the password
        const ispassvalid=await bcrypt.compare(password,euser.password)
        if(!ispassvalid)
        {
            return res.status(401).json({message:"invalid credentials"})
        }
        //creating token
          const token = jwt.sign(
      {
        id: euser._id,
        role: euser.role, // include role for authorization later
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //  Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: euser._id,
        name: euser.name,
        email: euser.email,
        role: euser.role,
      },
    });
    }
    catch(error)
    {
        res.status(500).json({message:"login failed",error:error.message})
    }
}
const adminlogout=async(req,res)=>
{
    res.status(200).json({message:"admin logout successful"})
}
const userlogout=async(req,res)=>
{
    res.status(200).json({message:"user logout successful"})
}
module.exports = { signup, signin,adminlogout,userlogout};
