import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

// REGISTER NEW USER:
export const register = async (request,response)=>{
    console.log("Registering New User")
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = request.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt)
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            views:0,
            impressions:0
        });

        const savedUser = await newUser.save();
        return response.status(201).json(savedUser);

    } catch (err) {
        return response.status(400).json({ error : err.message });
    }
}