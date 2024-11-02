import React from 'react';
import './index.css';
import {
    AppBar, Toolbar, Typography, Button, Box,
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
    Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent,
    DialogContentText,
    DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider, Grid
    } from '@mui/material';

function LandingPage(){
    return (
        <Grid container>
            <Grid sx={{display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0, bgcolor: '#DAF7A6'}}>
                <Grid item xs = {6} sx = {{width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center', color: '#355E3B', fontWeight: 'bold'}}>Not sure about the housing prices?</Typography>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center'}}>Simply enter your input here and you are good to go!</Typography>
                    <Button variant = "contained" sx = {{fontFamily: 'Rubik', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', textAlign: 'center', '&:hover': {backgroundColor: '#45a049'}}}>Start now</Button>
                </Grid>

                <Grid item xs = {3} sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "mrt.jpg" alt = "MRT image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Distance to nearest MRT</Typography>
                    </Grid>

                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "floorplan.jpg" alt = "Floor plan image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Floor size</Typography>
                    </Grid>
                </Grid>

                <Grid item xs = {3} sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "rooms.jpg" alt = "Rooms image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Number of rooms</Typography>
                    </Grid>

                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "lease.jpg" alt = "Lease image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Remaining lease</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0}}>
                <Grid item xs = {6} sx = {{marginTop: "20px", width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <img src = "history.jpg" alt = "History image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>

                <Grid item xs = {6} sx = {{margin: '20px', width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center', color: '#355E3B', fontWeight: 'bold'}}>View Previous Prediction Search Record</Typography> 
                    <Button variant = "contained" sx = {{marginTop: '10px', fontFamily: 'Rubik', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', textAlign: 'center', '&:hover': {backgroundColor: '#45a049'}}}>View</Button>
                </Grid>
            </Grid>

            <Grid sx={{marginTop: '20px', display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0, bgcolor: '#DAF7A6'}}>
                <Grid item xs = {6} sx = {{margin: '20px', width: '50%', display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, color: '#355E3B', fontWeight: 'bold'}}>About Us</Typography>
                    <Typography variant = "h7" sx = {{fontFamily: 'Rubik', margin: 2, color: '#355E3B', fontWeight: 'bold'}}>At Master House.au our purpose is to empower people by making property simple, efficient and stress free. Whether you’re just beginning your property journey or have had years of experience, Master House.com.au is the number one place for people to come together to explore, research and share their passion for Australian property.</Typography>
                </Grid>

                <Grid sx = {{marginBottom: '30px', width: '25%', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <img src = "house5.png" alt = "House image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>

                <Grid sx = {{paddingBottom: '20px', width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                    <img src = "house2.jpg" alt = "House image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>
            </Grid>
        </Grid>
    );
  }
  
  export default LandingPage;

import React from 'react';
import './index.css';
import {
    Grid, Typography, Button, Box
} from '@mui/material';

function LandingPage() {
    return (
        <Grid container>
            {/* First Section */}
            <Grid container sx={{ bgcolor: '#DAF7A6', padding: '20px' }}>
                {/* Headings and Button */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Rubik', color: '#355E3B', fontWeight: 'bold', marginBottom: '10px' }}>
                        Not sure about the housing prices?
                    </Typography>
                    <Typography variant="h6" sx={{ fontFamily: 'Rubik', marginBottom: '20px' }}>
                        Information is at your fingertips. Simply enter your input here and you are good to go!
                    </Typography>
                    <Button variant="contained" sx={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', '&:hover': { backgroundColor: '#45a049' } }}>
                        Start now
                    </Button>
                </Grid>

                {/* Images beside heading */}
                <Grid container item xs={12} md={6} spacing={2} sx={{ justifyContent: 'center', marginTop:'5px'}}>
                    {/* Image and text blocks */}
                    <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="mrt.jpg" alt="MRT image" style={{ maxWidth: '60%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Distance to nearest MRT</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="floorSize.png" alt="Floor plan image" style={{ maxWidth: '60%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Floor size</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="rooms.png" alt="Rooms image" style={{ maxWidth: '60%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Number of rooms</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="lease.png" alt="Lease image" style={{ maxWidth: '60%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Remaining lease</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* Other Sections */}
            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {/* History and Search */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <img src="history.jpeg" alt="History image" style={{ maxWidth: '80%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Rubik', color: '#355E3B', fontWeight: 'bold' }}>
                        View Previous Prediction Search Record
                    </Typography>
                    <Button variant="contained" sx={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', '&:hover': { backgroundColor: '#45a049' } }}>
                        View
                    </Button>
                </Grid>
            </Grid>

            {/* About Us Section */}
            <Grid container sx={{ marginTop: '20px', bgcolor: '#DAF7A6', padding: '20px' }} alignItems="center">
                {/* About Us Text */}
                <Grid item xs={12} md={6} sx={{ padding: '20px', textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Rubik', color: '#355E3B', fontWeight: 'bold', marginBottom: '10px' }}>About Us</Typography>
                    <Box sx={{ maxWidth: '90%', margin: { xs: '0 auto', md: '0' } }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Rubik', color: '#355E3B' }}>
                            At Master House.au, our purpose is to empower people by making property simple, efficient, and stress-free. Whether you're just beginning your property journey or have had years of experience, Master House.com.au is the number one place for people to come together to explore, research, and share their passion for Australian property.
                        </Typography>
                    </Box>
                </Grid>

                {/* Images */}
                <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: { xs: '20px', md: '0' } }}>
                    <img src="house5.png" alt="House image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: { xs: '20px', md: '0' } }}>
                    <img src="house2.png" alt="House image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>

        </Grid>
    );
}

export default LandingPage;

import React from 'react';
import './index.css';
import {
    AppBar, Toolbar, Typography, Button, Box,
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
    Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent,
    DialogContentText,
    DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider, Grid
    } from '@mui/material';

function LandingPage(){
    return (
        <Grid container>
            <Grid sx={{display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0, bgcolor: '#DAF7A6'}}>
                <Grid item xs = {6} sx = {{width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center', color: '#355E3B', fontWeight: 'bold'}}>Not sure about the housing prices?</Typography>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center'}}>Simply enter your input here and you are good to go!</Typography>
                    <Button variant = "contained" sx = {{fontFamily: 'Rubik', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', textAlign: 'center', '&:hover': {backgroundColor: '#45a049'}}}>Start now</Button>
                </Grid>

                <Grid item xs = {3} sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "mrt.jpg" alt = "MRT image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Distance to nearest MRT</Typography>
                    </Grid>

                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "floorplan.jpg" alt = "Floor plan image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Floor size</Typography>
                    </Grid>
                </Grid>

                <Grid item xs = {3} sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "rooms.jpg" alt = "Rooms image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Number of rooms</Typography>
                    </Grid>

                    <Grid sx = {{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <img src = "lease.jpg" alt = "Lease image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                        <Typography variant  = "h8" sx = {{fontFamily: 'Rubik', textAlign: 'center', marginTop: 1}}>Remaining lease</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0}}>
                <Grid item xs = {6} sx = {{marginTop: "20px", width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <img src = "history.jpg" alt = "History image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>

                <Grid item xs = {6} sx = {{margin: '20px', width: '50%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, textAlign: 'center', color: '#355E3B', fontWeight: 'bold'}}>View Previous Prediction Search Record</Typography> 
                    <Button variant = "contained" sx = {{marginTop: '10px', fontFamily: 'Rubik', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', textAlign: 'center', '&:hover': {backgroundColor: '#45a049'}}}>View</Button>
                </Grid>
            </Grid>

            <Grid sx={{marginTop: '20px', display: 'flex', flexDirection: 'row', minHeight: '200px', width: '100%', position: 'relative', top: 0, left: 0, bgcolor: '#DAF7A6'}}>
                <Grid item xs = {6} sx = {{margin: '20px', width: '50%', display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Typography variant = "h6" sx = {{fontFamily: 'Rubik', margin: 2, color: '#355E3B', fontWeight: 'bold'}}>About Us</Typography>
                    <Typography variant = "h7" sx = {{fontFamily: 'Rubik', margin: 2, color: '#355E3B', fontWeight: 'bold'}}>At Master House.au our purpose is to empower people by making property simple, efficient and stress free. Whether you’re just beginning your property journey or have had years of experience, Master House.com.au is the number one place for people to come together to explore, research and share their passion for Australian property.</Typography>
                </Grid>

                <Grid sx = {{marginBottom: '30px', width: '25%', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <img src = "house5.png" alt = "House image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>

                <Grid sx = {{paddingBottom: '20px', width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                    <img src = "house2.jpg" alt = "House image" style={{ maxWidth: '50%', height: 'auto' }} ></img>
                </Grid>
            </Grid>
        </Grid>
    );
  }
  
  export default LandingPage;

