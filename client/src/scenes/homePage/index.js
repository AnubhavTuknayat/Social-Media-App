import Navbar from "scenes/navbar/index.js";
import { Box } from "@mui/system";
import UserWidget from "scenes/widgets/UserWidget";
import { UseSelector, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import MyPostWidget from "scenes/widgets/MyPostWidget"
import FeedWidget from "scenes/widgets/FeedWidget";

const HomePage = () => {
    
    const user = useSelector((state)=>state.user)
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    return(
        <>
            <Box>
                <Navbar />
                <Box 
                width="98%" 
                p="2rem 2rem" 
                display={isNonMobileScreens?"flex":"block"}
                gap="2rem"
                justifyContent="space-between"
                >
                    <Box flexBasis={isNonMobileScreens?"26%":undefined}>
                        <UserWidget userId={user._id} picturePath={user.picturePath}/>
                    </Box>
                    <Box 
                    flexBasis={isNonMobileScreens?"42%":undefined}
                    mt={isNonMobileScreens?undefined:"2rem"}
                    >
                        <MyPostWidget picturePath={user.picturePath} />
                        <FeedWidget userId={user._id} isProfile={false}/>
                    </Box>
                    {isNonMobileScreens&&(
                        <Box flexBasis="26%">
                            
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
};

export default HomePage;