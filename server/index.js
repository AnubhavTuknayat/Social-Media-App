import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import axios from 'axios';
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import router from "./routes/auth.js"
import userRouter from "./routes/users.js"
import postRouter from "./routes/posts.js"
import {verifyToken} from "./middleware/verify.js"
import User from "./models/user.js";
import Post from "./models/post.js";
import {users,posts} from "./data/dummy.js"

// CONFIGS:
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(dirname,'public/assets')));

//FILE STORAGE:
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage});

// ROUTES WITH FILES
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);

// ROUTES
app.use("/auth",router);
app.use("/users",userRouter)
app.use("/posts",postRouter)

// MONGOOSE SETUP:
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, '0.0.0.0', ()=> {
        console.log(`Server Port: ${PORT}`)

        //Add dummy data once
        // User.insertMany(users);
        // Post.insertMany(posts);
        
    });
}).catch((error)=> console.log(`Did not connect: ${error}`));

