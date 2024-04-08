import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material"

import {Box,Divider,IconButton, Typography,useTheme} from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPost } from "state"

const PostWidget = ({post}) => {
    const [isComments,setIsComments] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.token)
    const loggedInUserId = useSelector((state)=>state.user._id)
    const isLiked = Boolean(post.likes[loggedInUserId]);
    const likeCount = Object.keys(post.likes).length();

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const handleLike = async () =>{
        const url = `http://localhost:3001/posts/${post._id}/like`
        const response = await fetch(
            url,
            {
            method:"PATCH",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId:loggedInUserId})
            }
        )
        const updatedPost = await response.json();
        dispatch(setPost({post:updatedPost}))
    }

    useEffect(()=>{
        console.log("HERE:" , post);
    })

    return(
        <>
        <WidgetWrapper m="2rem 0">
            <Friend 
            friendId={post.userId}
            name={`${post.firstName} ${post.lastName}`}
            subtitle={post.location}
            userPicturePath={post.userPicturePath}
            />
            <Typography color={main} sx={{mt:"1rem"}}>
                {post.caption}
            </Typography>
        </WidgetWrapper>
        </>
    )
}

export default PostWidget