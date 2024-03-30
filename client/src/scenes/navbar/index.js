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
import { useDispatch,useSelector } from "react-redux";
import {setMode,setLogout} from "state"
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {

    const [isMobileMenuToggled,setMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullName = user===null?`Full Name`:`${user.firstName} ${user.lastName}`;

    const goToHome = () =>{
        navigate("/home");
    }
    const handleThemeChange = ()=> {
        dispatch(setMode());
    }
    const handleLogout = ()=> {
        dispatch(setLogout());
    }
    const handleMobileMenu = ()=>{
        setMobileMenuToggled(!isMobileMenuToggled)
    }

    return(
        <>
            <FlexBetween padding="0.1rem 1rem" backgroundColor={alt}>
                <FlexBetween gap="1rem">
                    <Typography 
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={() => goToHome()}
                    sx={{
                        "&:hover":{
                            color:dark,
                            cursor:"pointer",
                            scale:"1.03",
                            transition:"0.1s ease-in-out"
                        }
                    }}
                    >
                        Postpedia
                    </Typography>

                    {isNonMobileScreens && (
                        <FlexBetween backgroundColor={neutralLight} borderRadius="3rem" gap="0.5rem" padding="0.1rem 1rem">
                            <InputBase placeholder="Search..."/>
                            <IconButton>
                                <Search/>
                            </IconButton>
                        </FlexBetween>
                    )}
                </FlexBetween>
                
                {/* DESKTOP */}
                {isNonMobileScreens?(
                    <FlexBetween gap="1rem">
                        <IconButton onClick={()=>handleThemeChange()}>
                            {theme.palette.mode==="light"?(
                                <DarkMode sx={{
                                    fontSize:"1.7rem",
                                }}/>
                            ):(
                                <LightMode sx={{
                                    color:dark,
                                    fontSize:"1.7rem"
                                }}/>
                            )}
                        </IconButton>
                        <IconButton>
                            <Message sx={{
                                    fontSize:"1.7rem",
                                }}/>
                        </IconButton>
                        <IconButton>
                            <Notifications sx={{
                                    fontSize:"1.7rem",
                                }}/>
                        </IconButton>
                        <IconButton>
                            <Help sx={{
                                    fontSize:"1.7rem",
                                }}/>
                        </IconButton>
                        <FormControl variant="standard" value={fullName}>
                                <Select 
                                    value={fullName} 
                                    sx={{
                                        backgroundColor:neutralLight,
                                        width:"150px",
                                        borderRadius:"0.25rem",
                                        padding:"0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem",
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: neutralLight,
                                        }, 
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>
                                            {fullName}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>handleLogout()}>
                                        Log Out
                                    </MenuItem>
                                </Select>
                        </FormControl>
                    </FlexBetween>                    
                ):(
                    <IconButton onClick={()=>handleMobileMenu()}>
                        <Menu />
                    </IconButton>                  
                )}

                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        top="0"
                        hieght="100%"
                        zIndex="10"
                        maxWidth="500px"
                        maxHeight="500px"
                        backgroundColor={background}
                    >
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={()=>handleMobileMenu()}>
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="0.2rem">
                            <IconButton onClick={()=>handleThemeChange()} sx={{fontSize:"25px"}}>
                                {theme.palette.mode==="light"?(
                                    <DarkMode sx={{
                                        fontSize:"1.7rem",
                                    }}/>
                                ):(
                                    <LightMode sx={{
                                        color:dark,
                                        fontSize:"1.7rem"
                                    }}/>
                                )}
                            </IconButton>
                            <IconButton>
                                <Message sx={{
                                        fontSize:"1.7rem",
                                    }}/>
                            </IconButton>
                            <IconButton>
                                <Notifications sx={{
                                        fontSize:"1.7rem",
                                    }}/>
                            </IconButton>
                            <IconButton>
                                <Help sx={{
                                        fontSize:"1.7rem",
                                    }}/>
                            </IconButton>

                            <MenuItem onClick={()=>handleLogout()}>
                                Log Out
                            </MenuItem>

                        </FlexBetween>                             
                    </Box>
                )}

            </FlexBetween>
        </>
    )
};

export default Navbar;