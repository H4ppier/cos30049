import React, { useState } from 'react';
import {Button, TextField, Grid, Box, Typography, Container, Paper } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'username' && !value) {
      error = 'Username is required';
    } else if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Email address is invalid';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    } else if (name === 'confirmPassword') {
      if (!value) {
        error = 'Confirm Password is required';
      } else if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    }
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field on each change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      // Stop form submission if there are validation errors
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/Login'); // Redirect to login after successful signup
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Username already taken',
        }));
      } else {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: '#E5FFCC', flexGrow: 1 }}>
      <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4, backgroundColor: '#FFFFFF', pb: 2, background: 'linear-gradient(to right, #c3f0a2, #aef4c9)', borderRadius: '20px' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ height: '100%' }}>
          {/* Left Side: Image */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%' }}>
            <Paper elevation={3} sx={{overflow: 'hidden', borderRadius: '10px', height: '100%', width: '100%',}}>
              <Box component="img" src="LoginSignupPic/HousePicture.jpg" alt="House" sx={{width: '100%', height: '536px', objectFit: 'cover'}}/>
            </Paper>
          </Grid>

          {/* Right Side: Registration Form */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%' }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: '16px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#D9F7C3' }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Register Now
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'teal' }}>
                  Your Future is Now
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" value={formData.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} autoFocus />
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formData.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}/>
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} />
                <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword}/>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, backgroundColor: 'teal', color: 'white', borderRadius: '20px' }}>
                  Sign Up
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default RegisterPage;