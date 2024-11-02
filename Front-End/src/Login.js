import React, { useState } from 'react';
import {Typography, Container, Grid, Button, Box, TextField, Paper} from '@mui/material';
import {Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }){
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); // Error for invalid login credentials

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields before making the request
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', formData);
      localStorage.setItem('token', response.data.access_token);
      setIsAuthenticated(true); // Update authentication state
      navigate('/'); // Redirect to the home page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid username or password');
      } else {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: '#E5FFCC', flexGrow: 1 }}>
      <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4 , pb: 2 , background: 'linear-gradient(to right, #c3f0a2, #aef4c9)' , borderRadius: '20px'  }}>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          {/* First Paper for the Form */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%' }}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: '16px', backgroundColor: '#D9F7C3'}}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Login Now
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'teal' }}>
                  Your Future is Now
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                <Box sx={{ textAlign: 'right', mb: 1 }}>
                  <Typography style={{ textDecoration: 'none', color: 'teal' }}>
                    Forgot Password?
                  </Typography>
                </Box>
                {loginError && (
                  <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
                    {loginError}
                  </Typography>
                )}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, backgroundColor: 'teal', color: 'white', borderRadius: '20px' }}>
                  Log In
                </Button>
                <Grid container justifyContent="center">
                  <Typography variant="body2" sx={{ mr: 1 }}>Don't have an account?</Typography>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'teal' }}>
                    Sign Up
                  </Link>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Second Paper for the Image */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%'}}>
          <Paper elevation={3} sx={{overflow: 'hidden', borderRadius: '10px', height: '100%', width: '100%',}}>
            <Box component="img" src="LoginSignupPic/HousePicture.jpg" alt="House" sx={{ width: '100%', height: '430px', objectFit: 'cover',}}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;