const user = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary=require('../utls/cloudinary')

const signup = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Handle file upload only if file is provided
        let imageUrl = null;
        if (req.file) {
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            imageUrl = cloudinaryResponse.url;
        } else {
            
            imageUrl = "https://res.cloudinary.com/dhilrelgq/image/upload/v1752072616/451-4517876_default-profile-hd-png-download_ha0u35.png";
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role,
            image: imageUrl,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Error in creating profile",
            error: error.message,
        });
    }
};
const signin = async (req, res) => {
    try {
        const {email, password, role } = req.body;
        
        // Find user
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Verify role
        if (existingUser.role !== role) {
            return res.status(403).json({ 
                message: `Access denied. You are not authorized as ${role}` 
            });
        }

        // Create token
        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // Send success response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                image:existingUser.image
            },
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Login failed", 
            error: error.message 
        });
    }
};

const adminlogout = async (req, res) => {
    res.status(200).json({ message: "Admin logout successful" });
};

const userlogout = async (req, res) => {
    res.status(200).json({ message: "User logout successful" });
};

module.exports = { signup, signin, adminlogout, userlogout };