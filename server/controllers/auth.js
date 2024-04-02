import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

// REGISTER NEW USER:
export const register = async (request,response)=>{
    console.log("Registering New User: ", request.body)
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
        // console.log("PASSWORD: " , password);

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt)
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
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
        console.error("Error registering user:", err);
        return response.status(500).json({ error : err.message });
    }
}

// LOGGING IN:
export const login = async (request,response) =>{
    try {
        console.log("HERE")
        console.log("email: ",request.body)
        const {email,password} = request.body;

        //Check Email:
        const foundUser = await User.findOne({email:email});

        if(!foundUser){
            return response.status(400).json({message:"User does not exist!"})
        }

        // Check Password:
        const passwordMatch = await bcrypt.compare(password,foundUser.password);

        if(!passwordMatch){
            return response.status(400).json({message:"Incorrect Password!"})
        }

        const token = jwt.sign({id:User._id},process.env.JWT_Secret);
        delete foundUser.password;

        return response.status(200).json({token,foundUser})

    } catch (err) {
        // console.log(request)
        return response.status(500).json({error:err.message})
    }
}