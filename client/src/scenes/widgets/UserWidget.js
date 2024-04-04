import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material"

import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedinIcon from "@mui/icons-material/LinkedIn"
import {Box,Typography,Divider,useTheme} from "@mui/material"
import UserImage from "components/UserImage.js"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useSelector } from "react-redux"
import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"

const UserWidget = ({userId,picturePath}) =>{
    const [user,setUser] = useState(null)
    const {palette} = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state)=>state.token)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const fullName = (!user)?`Full Name`:`${user.firstName} ${user.lastName}`

    const getUser = async () => {
        // console.log(userId)
        const response = await fetch(
            `http://localhost:3001/users/${userId}`,
            {
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        const data = await response.json();
        setUser(data);
    }

    const goToProfile = ()=>{
        navigate(`/profile/${userId}`)
    }

    useEffect(()=>{
        console.log("USER: ",userId)
        getUser();
    },[])

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        friends,
        location,
        occupation,
        views,
        impressions
    } = user;

    return (
        <>
            <WidgetWrapper sx={{
                color:dark,
                // m:"2rem",
                width:"100%"
            }}>

                {/* First segment */}
                <FlexBetween
                    gap="0.5rem"
                    pb="1rem"
                >
                    <FlexBetween sx={{
                        gap:"1.3rem"
                    }}>
                        <UserImage image={picturePath} />
                        <Box>
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                sx={{
                                    "&:hover":{
                                        color:medium,
                                        cursor:"pointer"
                                    }
                                }}
                                onClick={()=>goToProfile()}
                            >
                                {fullName}
                            </Typography>
                            <Typography color={medium}>
                                {friends.length} {friends.length===1?`Friend`:`Friends`}
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <FlexBetween>
                            <ManageAccountsOutlined />
                    </FlexBetween>
                </FlexBetween>
                <Divider/>

                {/* Second segment */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                        <LocationOnOutlined fontSize="large" sx={{color:main}} />
                        <Typography color={medium}>
                            {location}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color:main}} />
                        <Typography color={medium}>
                            {occupation}
                        </Typography>
                    </Box>
                </Box>
                <Divider/>
                {/* Third segment */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>
                            Number of profile views
                        </Typography>
                        <Typography color={main} fontWeight="500">
                            {views}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>
                            Number of post impressions
                        </Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>
                <Divider/>
                {/* Fourth segment */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween mb="0.5rem" gap="0.5rem">
                        <FlexBetween gap="1rem">
                            <TwitterIcon sx={{height:"2.3rem",width:"2.3rem"}} />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color:{main}}}/>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem" gap="0.5rem">
                        <FlexBetween gap="1rem">
                            <LinkedinIcon sx={{height:"2.3rem",width:"2.3rem"}} />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color:{main}}} />
                    </FlexBetween>
                </Box>
            </WidgetWrapper>
        </>
    )

}

export default UserWidget
