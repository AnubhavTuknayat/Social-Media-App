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
    const likeCount = Object.keys(post.likes).length;
    const name = `${post.firstName} ${post.lastName}`

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
        console.log(updatedPost)
        dispatch(setPost({post:updatedPost}))
    }

    useEffect(()=>{
        // console.log(post._id)
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
            {post.picturePath&&(
                <img
                width="100%"
                height="100%"
                alt="post"
                style={{borderRadius:"0.75rem",marginTop:"0.25rem"}}
                src={`http://localhost:3001/assets/${post.picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.1rem">
                        <IconButton onClick={()=>handleLike()}>
                            {!isLiked?(
                            <FavoriteOutlined />
                            ):(
                            <FavoriteOutlined sx={{color:"red"}}/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.1rem">
                        <IconButton onClick={()=>setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{post.comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {post.comments.map((comment,i)=>(
                        <Box key={`${name} ${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
        </>
    )
}

export default PostWidget