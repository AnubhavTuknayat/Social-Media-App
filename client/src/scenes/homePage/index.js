import Navbar from "scenes/navbar/index.js";
import { Box } from "@mui/system";
import UserWidget from "scenes/widgets/UserWidget";
import { UseSelector, useSelector } from "react-redux";

const HomePage = () => {
    
    const user = useSelector((state)=>state.user)

    return(
        <>
            <Box>
                <Navbar />
                <UserWidget userId={user._id} picturePath={user.picturePath}/>
            </Box>
        </>
    )
};

export default HomePage;