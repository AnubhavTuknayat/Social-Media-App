import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import {setPosts} from "state"
import PostWidget from "./PostWidget";

const FeedWidget = ({userId,isProfile=false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts)
    const token = useSelector((state)=>state.token)
    

    const getFeed = async () => {
        const url = isProfile?`http://localhost:3001/posts/${userId}`:`http://localhost:3001/posts`;

        const response = await fetch(
            url,
            {
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            }
        )
        const data = await response.json();
        dispatch(setPosts({posts:data}))
        // console.log("POSTS SET, " , data)
    }

    useEffect(()=>{
        // console.log("POSTS: " , posts)
        getFeed();
        // console.log("POSTS: " , posts)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

return(
    <>
        {posts.map((post)=>{
            return <PostWidget key={post._id} post={post} />
        })}
    </>
)

}

export default FeedWidget