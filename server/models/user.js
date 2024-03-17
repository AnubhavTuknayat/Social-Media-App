import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:5
        },
        picturePath:{
            type:String,
            default:""
        },
        friends:{
            type:Array,
            default:[]
        },
        location:{
            type:String
        },
        occupation:{
            type:String
        },
        views:{
            type:String
        },
        impressions:{
            type:String
        }
    },
    {timestamps:true}
)

const User = mongoose.model("User",UserSchema);

export default User