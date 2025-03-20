import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


//Create a json web token, _id is part of the payload of the token
const createToken = (_id) => {
        return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//Login User: We need async function because later on we need function that interacts with the database
export const loginUser = async (req, res) => {
        const {email, password} = req.body;
        try {
                const user = await User.login(email, password);
                const token = createToken(user._id);
                return res.status(200).json({success: true, data: user, token});
        } catch (error) {
                return res.status(400).json({success: false, message: error.message});
        }
}; 


//Singup User
export const signupUser = async (req, res) => {
        const {username, password, email} = req.body;
        try {
                const user = await User.signup(username, password, email);
                const token = createToken(user._id);
                return res.status(200).json({success: true, data: user, token});
        } catch (error) {
                return res.status(400).json({success: false, message: error.message});
        }
}; 


//Previous
export const createUser = async (req, res) => {
        //Get the content from the user

        console.log("Get in createUser");
        const user = req.body;
        
        //Validate if the response is missing
        if (!user.username || !user.password || !user.email) {
                return res.status(400).json({success: false, message: "please provide all fields"});
        }
        
        //Create a product model from product.model.js
        const newUser = new User(user);

        try {
                //Save the newProduct to MongoDB
                await newUser.save();
                return res.status(201).json({success: true, data: newUser});
        } catch (error) {
                console.log("Error in creating product", error.message);
                return res.status(500).json({success: false, message: "Create product fail"});
        }
}; 

export const getUser = async(req, res) => {
        try {
                //Fetch all the products that we have in the database
                const users = await User.find({});
                res.status(200).json({success: true, data: users});
        } catch (error) {
                console.log("Erro: ", error.message);
                res.status(500).json({success: false, message: "get users failed"});
        }
}
