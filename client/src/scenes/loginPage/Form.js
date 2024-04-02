import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {Formik} from "formik"

import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { ErrorSharp, Palette } from "@mui/icons-material";

const registerSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("Invalid Email!").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email:yup.string().required("required"),
    password:yup.string().required("required")
})

const initialValuesRegister = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}

const initialValuesLogin = {
    email:"",
    password:"",
}

const Form = ()=>{
    const [pageType,setPageType] = useState("login");
    const {palette} = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px")
    const isLogin = pageType==="login"
    const isRegister = pageType==="register"

    const togglePageType = (type) => {
        setPageType(type)
    }

    const register = async (values,onSubmitProps) => {
        console.log(values)
        const formData = new FormData();
        // console.log(formData)
        for(let value in values){
            formData.append(value,values[value]);
        }
        formData.append('picturePath',values.picture.name)
        // console.log(formData)
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method:"POST",
                body:formData,
            }
        )
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        
        if(savedUser){
            setPageType("login");
        }

    };

    const login = async (values, onSubmitProps) => {
        // console.log(values)
        // const formData = new FormData();
        // console.log(formData)
        // for(let value in values){
        //     formData.append(value,values[value]);
        // }
        // console.log(formData.get("email"))
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login", 
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            }
        );
        console.log("RESPONSE: ",loggedInResponse)
        const loggedIn = await loggedInResponse.json();
        console.log("RES: ",loggedIn)
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
              setLogin({
                    user: loggedIn.foundUser,
                    token: loggedIn.token,
              })
            );
            navigate("/home");
          }
      };

    const handleFormSubmit = async (values,onSubmitProps) => {
        // console.log(values)
        if(isLogin){
            await login(values,onSubmitProps);
        }
        else{
            // console.log("here")
            await register(values,onSubmitProps);
        }
    }

    return (
        <>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin?initialValuesLogin:initialValuesRegister}
            validationSchema={isLogin?loginSchema:registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            })=>(
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="0.7rem" gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx={{"&>div":{gridColumn:isNonMobile?undefined:"span 4"}}}
                    >
                        {isRegister&&(
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName)&&Boolean(errors.firstName)}
                                    hyperText={touched.firstName && errors.firstName}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName)&&Boolean(errors.lastName)}
                                    hyperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location)&&Boolean(errors.location)}
                                    hyperText={touched.location && errors.location}
                                    sx={{gridColumn:"span 4"}}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation)&&Boolean(errors.occupation)}
                                    hyperText={touched.occupation && errors.occupation}
                                    sx={{gridColumn:"span 4"}}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="0.2rem"
                                    p="0.2rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpeg,.jpg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles)=>setFieldValue("picture",acceptedFiles[0])}
                                    >
                                        {({getRootProps,getInputProps})=>(
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="0.3rem 1rem"
                                                sx={{
                                                    "&:hover":{cursor:"pointer"}
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture?(
                                                    <p>Add Profile Picture Here</p>
                                                ):(
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email)&&Boolean(errors.email)}
                                    hyperText={touched.email && errors.email}
                                    sx={{gridColumn:"span 4"}}
                        />
                        <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password)&&Boolean(errors.password)}
                                    hyperText={touched.password && errors.password}
                                    sx={{gridColumn:"span 4"}}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                    }}
                    >
                        {isLogin?(
                            <>
                                <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m:"1rem auto",
                                    p:"1rem",
                                    width:"50%",
                                    backgroundColor:palette.primary.main,
                                    color:palette.background.alt,
                                    "&:hover":{
                                        color:palette.primary.main,
                                        backgroundColor:palette.background.default
                                    }
                                }}
                                // onClick={()=>resetForm()}
                                >
                                    Login
                                </Button>

                                <Typography
                                    sx={{
                                        color:palette.background.primary,
                                        textDecoration:"underline",
                                        alignSelf:"start",
                                        "&:hover":{
                                            color:palette.primary.main,
                                            cursor:"pointer"
                                        }
                                    }}
                                    onClick={()=>togglePageType("register")}
                                >

                                    New to Postpedia? Sign up here

                                </Typography>
                            </>
                        ):(
                            <>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m:"1rem auto",
                                    p:"1rem",
                                    width:"50%",
                                    backgroundColor:palette.primary.main,
                                    color:palette.background.alt,
                                    "&:hover":{
                                        color:palette.primary.main,
                                        backgroundColor:palette.background.default
                                    }
                                }}
                            >
                                Register
                            </Button>
                            
                                <Typography
                                    sx={{
                                        color:palette.background.primary,
                                        textDecoration:"underline",
                                        alignSelf:"start",
                                        "&:hover":{
                                            color:palette.primary.main,
                                            cursor:"pointer"
                                        }
                                    }}
                                    onClick={()=>togglePageType("login")}
                                > 
                                    Already have an account? Sign in here
                                </Typography>
                            </>
                        )}
                    </Box>
                </form>
            )}

        </Formik>
        </>
    )

}

export default Form