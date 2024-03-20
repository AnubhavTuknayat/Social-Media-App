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
import router from "./routes/auth.js"
import userRouter from "./routes/users.js"
import {verifyToken} from "./middleware/verify.js"

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

// ROUTES
app.post("/auth/register",upload.single("picture"),register);

app.use("/auth",router);
app.use("/users",userRouter)

// MONGOOSE SETUP:
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server Port: ${PORT}`)

    // Testing Register:
        // const dummyObject = {
        //     firstName: "John",
        //     lastName: "Doe",
        //     email: "john.doe@example.com",
        //     password: "password123",
        //     picturePath: "./pubic/assets/p1.jpeg",
        //     friends: ["Friend1", "Friend2"],
        //     location: "New York",
        //     occupation: "Developer"
        // };
        
        // axios.post('http://localhost:3001/auth/register', dummyObject)
        //     .then(response => {
        //         console.log('Registration successful:', response.data);
        //     })
        //     .catch(err => {
        //         console.error('Registration failed' + err.message);
        //     });
        
        const userId = '65f9e084f50d2a63b5364db8';
        const authToken = '4NU&H@V.TU%N4/@T.ATUK';

        axios.patch(`http://localhost:3001/users/getUser`,{
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
        })
        .then(response => {
            console.log('Success', response.data);
        })
        .catch(err => {
            console.error('Failure', err);
        });

    });
}).catch((error)=> console.log(`Did not connect: ${error}`));

