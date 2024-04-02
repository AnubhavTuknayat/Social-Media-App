import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material"

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
                color:"white",
                m:"2rem",
                width:"21%"
            }}>
                <FlexBetween>
                    <FlexBetween sx={{
                        gap:"1.3rem"
                    }}>
                        <UserImage image={user.picturePath} />
                        <FlexBetween sx={{
                            flexDirection:"column",
                            gap:"1rem",
                            alignItems:"flex-start"
                        }}>
                            <Typography sx={{
                                fontSize:"1.2rem"
                            }}>
                                {fullName}
                            </Typography>
                            <Typography>
                                {friends.length} {friends.length===1?`Friend`:`Friends`}
                            </Typography>
                        </FlexBetween>
                    </FlexBetween>
                    <FlexBetween>
                            <ManageAccountsOutlined />
                    </FlexBetween>
                </FlexBetween>
                
            </WidgetWrapper>
        </>
    )

}

export default UserWidget
