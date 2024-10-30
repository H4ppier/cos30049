import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
  Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent,
  DialogContentText,
  DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider
  } from '@mui/material';

  import {
    Home as HomeIcon,
    } from '@mui/icons-material';

function Navbar() {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        
        <AppBar sx = {{bgcolor: 'white'}}>
          <Toolbar>
            <HomeIcon sx = {{mr: 4, color: 'black'}} />

            <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', fontweigth: 'bold'}}>
              House Master
            </Typography>
            <Button color="inherit" sx = {{flexGrow: 1, color: 'black'}}>Price Prediction</Button>
            <Button color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>About Us</Button>
            <Button color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Login</Button>
            <Button color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Register</Button>
          </Toolbar>
        </AppBar>
      </Box>
  );
}

export default Navbar;