import { useState } from "react";
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import Form from "./Form"


const LoginPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    return(
        <>
        <Box backgroundColor={theme.palette.background.default} height="100vh">
            <Box backgroundColor={theme.palette.background.alt} p="0.5rem 1rem" textAlign="center" marginBottom="2rem">
                <Typography 
                    fontWeight="bold"
                    fontSize="2.5rem"
                    color="primary"
                    >
                        Postpedia
                </Typography>
            </Box>

            <Box width={isNonMobileScreens?"40%":"90%"} p="1rem" m="1rem auto" borderRadius="2rem" backgroundColor={theme.palette.background.alt}>
                <Typography 
                    fontWeight="500"
                    variant="h5"
                    textAlign="center"
                    sx={{
                        mb:"1.5rem"
                    }}
                    >
                        Welcome to Postpedia!
                </Typography>
                <Form />
            </Box>
        </Box>
        </>
        
    )
};

export default LoginPage;