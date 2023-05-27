import React,{useState,useCallback} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { signInSchema } from "../../schemas";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let initialValues = {
  email:"",
  password:""
}
const REDIRECT_URI = window.location.href;

const Login = () => {
  const navigate = useNavigate();
  const loginUser = async (values)=>{
      var config = {
        method: 'post',
        url: `${process.env.REACT_APP_API}/api/login`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : values
      };
      axios(config)
      .then(function (response) {
          if(response.data.status){
            toast.success(response.data.message);
            localStorage.setItem('userData',JSON.stringify({email: values.email,token: response.data.token,isEmailVerify: false }))
            navigate("/home");
          }
          else{
            toast.error(response.data.message)
          }
      })
      .catch(function (error) {
          toast.error(error.response.data.message)
      });
  }
  let {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit : (values)=>{
      loginUser(values)
    }
  })



  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errors.email && touched.email?true:false}
            helperText={touched.email && errors.email?errors.email:''}
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            error={errors.password && touched.password?true:false}
            helperText={touched.password && errors.password?errors.password:''}
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          
          
        </Box>
      </Box>
      <ToastContainer/>
    </Container>
  );
}

export default Login;