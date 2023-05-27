import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




let initialValues = {
  name:'',
  email:"",
  password:"",
}
const Register = ()=>{
    const navigate = useNavigate();
    const createUser = async (values)=>{
        var config = {
          method: 'post',
          url: `${process.env.REACT_APP_API}/api/createUser`,
          headers: { 
              'Content-Type': 'application/json'
          },
          data : values
        };
        axios(config)
        .then(function (response) {
            if(response.data.status){
              toast.success(response.data.message);
              navigate("/");
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
      validationSchema: signUpSchema,
      onSubmit : (values)=>{
        createUser(values)
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
          Register New User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
          <TextField
            error={errors.name && touched.name?true:false}
            helperText={touched.name && errors.name?errors.name:''}
            size="small"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus={true}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          
          <TextField
            error={touched.email && errors.email?true:false}
            helperText={touched.email && errors.email?errors.email:''}
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          
          <TextField
            error={touched.password && errors.password?true:false}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer/>
    </Container>
    );
}

export default Register;