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
                <Grid container item xs={12} md={6} spacing={2} sx={{ justifyContent: 'center' }}>
                    {/* Image and text blocks */}
                    <Grid item xs={6} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="LandingPagePic/mrt.jpg" alt="MRT image" style={{ maxWidth: '100%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Distance to nearest MRT</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="LandingPagePic/floorSize.png" alt="Floor plan image" style={{ maxWidth: '100%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Floor size</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="LandingPagePic/rooms.png" alt="Rooms image" style={{ maxWidth: '100%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Number of rooms</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="LandingPagePic/lease.png" alt="Lease image" style={{ maxWidth: '100%', height: 'auto' }} />
                            <Typography variant="body1" sx={{ marginTop: '8px', textAlign: 'center' }}>Remaining lease</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* Other Sections */}
            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                {/* History and Search */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <img src="LandingPagePic/history.jpeg" alt="History image" style={{ maxWidth: '80%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Rubik', color: '#355E3B', fontWeight: 'bold' }}>
                        View Previous Prediction Search Record
                    </Typography>
                    <Button variant="contained" sx={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '20px', padding: '10px 20px', '&:hover': { backgroundColor: '#45a049' } }}>
                        View
                    </Button>
                </Grid>
            </Grid>

            {/* About Us Section */}
            <Grid container sx={{ marginTop: '20px', bgcolor: '#DAF7A6', padding: '20px' }}>
                <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Rubik', color: '#355E3B', fontWeight: 'bold' }}>About Us</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Rubik', color: '#355E3B' }}>
                        At Master House.au our purpose is to empower people by making property simple, efficient and stress free. Whether you’re just beginning your property journey or have had years of experience, Master House.com.au is the number one place for people to come together to explore, research, and share their passion for Australian property.
                    </Typography>
                </Grid>
                <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="LandingPagePic/house5.png" alt="House image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="LandingPagePic/house2.png" alt="House image" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LandingPage;
