import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material"
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { UseDispatch,useSelector } from "react-redux";
import {setMode,setLogout} from "state"
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
    return(
        <>
            <div>LoginPage</div>
        </>
        
    )
};

export default LoginPage;