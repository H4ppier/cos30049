import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
  Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider, Paper, CssBaseline, Breadcrumbs  } from '@mui/material';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login(){
  const theme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box sx={{ backgroundColor: '#E5FFCC', flexGrow: 1 }}>
    {/* <ThemeProvider theme={theme} sx={{ backgroundColor: '#E8F5E9', flexGrow: 1 }}> */}
    <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <CssBaseline />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* First Paper for the Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                    <Grid item xs>
                      <Button href="#" variant="text" size="small">
                        Forgot password?
                      </Button>
                    </Grid>
                    <Grid item>
                      <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="text" size="small">
                          {"Don't have an account? Sign Up"}
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Second Paper for the Image */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {/* Image displayed inside the Paper */}
                <img
                  src="https://via.placeholder.com/300"
                  alt="Sign In Visual"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    {/* </ThemeProvider> */}
    </Box>
  );
}

  export default Login;