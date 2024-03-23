import Post from "../models/post.js"
import User from "../models/user.js"

// CREATE
export const createPost = async (request,response) => {
    try {
        const {
            userId,
            caption,
            picturePath
        } = request.body();
        
        const user = await User.findById(userId);

        const newPost = new Post(
            {
                userId,
                firstName:user.firstName,
                lastName:user.lastName,
                location:user.location,
                caption,
                picturePath,
                userPicturePath:user.picturePath,
                likes:{},
                comments:[]
            }
        )
    
        await newPost.save();

        const allPosts = await Post.find();
        return response.status(200).json(allPosts)

    } catch (err) {
        console.log("Could not create Post: ",err)
        return response.status(409).json({error:err.message});
    }
};

// READ
export const getFeed = async (request,response) => {

}