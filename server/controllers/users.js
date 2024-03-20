import User from "../models/user.js";

// Get User:
export const getUser = async (request,response) => {
    try {
        const {id} = request.params;
        const user = await User.findById(id);

        if(!user)return response.status(404).json({message:"User not found!"})

        return response.status(200).json(user)

    } catch (err) {
        return response.status(404).json({message:err.message})
    }
}

// Get Friends:
export const getUserFriends = async (request,response) => {
    try {
        const {id} = request.params;
        const user = await User.findById(id);
    
        if(!user)return response.status(404).json({message:"User not found!"})
        
        const friends = await Promise.all(
            user.friends.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location}) =>{
                return {_id,firstName,lastName,occupation,location}
            }
        );
    
        return response.status(200).json(formattedFriends);     
    } catch (err) {
        return response.status(404).json({error:err.message});
    }
}

// Update Friends
export const addRemoveFriend = async (request,response) => {
    try {
        console.log("Code reached here no way")
        const {id,friendId} = request.params;
        const user = await User.findById(id);

        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>{
                return id!==friendId;
            })

            friend.friends = friend.friends.filter((id)=>{
                return id!==id;
            })
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friendId)=>{
                return User.findById(friendId);
            })
        );

        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location}) =>{
                return {_id,firstName,lastName,occupation,location}
            }
        );
    
        return response.status(200).json(formattedFriends); 

    } catch (err) {
        console.error("ERROR:", err);
        return response.status(404).json({error:err.message})
    }
}