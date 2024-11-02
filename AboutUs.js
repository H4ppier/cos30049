import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Snackbar, Alert, Switch, Divider, Grid, Card, CardContent, Paper
} from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, Mail as MailIcon } from '@mui/icons-material';
import welcomeBg from './assets/meeting-bg.jpg'; // Import the image
import achievementImage from './assets/achievement.jpg';
import vision from './assets/vision.png';

function AboutUs() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Toggle drawer open/close
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'About', 'Contact'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <HomeIcon /> : index === 1 ? <InfoIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#E8F5E9', flexGrow: 1 }}>
      

      

      {/* Enlarged Carousel Section with Heading and Description */}
      <Box
        sx={{
          backgroundImage: `url(${welcomeBg})`,
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align the content to the left
          paddingLeft: '10%', // Add some padding for better positioning
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ color: '#fff', textAlign: 'left', maxWidth: '600px' }}>
          <Typography variant="h3">
            Here's the Story of Housing Master
          </Typography>
          <Divider sx={{ bgcolor: 'yellow', height: 2, width: '20%', my: 2 }} /> {/* Smaller divider */}
          <Typography variant="body1">
            House Master is a platform dedicated to providing the best insights into the housing market. We combine data analytics with machine learning to help homeowners and potential buyers make informed decisions.
          </Typography>
        </Box>
      </Box>

      {/* Meet Our Team Section */}
      <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  <section className="team">
    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>Meet Our Team</Typography>
    <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: '1200px' }}> {/* Max width to center the cards */}
      {/* Card 1 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ width: '350px' }}>
          <Box sx={{ padding: 1.5 }}>
            <Box component="img" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/242ba782-d237-4767-8ca4-07024fcd84c0/cc1bc566-201d-4df3-b535-c1c280e2cbc0.png" alt="User 1" sx={{ width: '100%', borderRadius: '8px', height:'250px'}} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>Gabriel</Typography>
            <Typography variant="body2">Software Developer</Typography>
            <Typography variant="body2">gabriel@gmail.com</Typography>
            <Button variant="contained" sx={{ marginTop: 1 }}>Contact</Button>
          </Box>
        </Card>
      </Grid>

      {/* Card 2 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ width: '350px' }}>
          <Box sx={{ padding: 1.5 }}>
            <Box component="img" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/b3809ffe-b67d-4c71-8cc7-26a4bba632bb/eef15880-ddc7-4fd0-a4af-154fc5835d05.png" alt="User 2" sx={{ width: '100%', borderRadius: '8px', height:'250px' }} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>Liew Jun Yang</Typography>
            <Typography variant="body2">Software Developer</Typography>
            <Typography variant="body2">jun@gmail.com</Typography>
            <Button variant="contained" sx={{ marginTop: 1 }}>Contact</Button>
          </Box>
        </Card>
      </Grid>

      {/* Card 3 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ width: '350px' }}>
          <Box sx={{ padding: 1.5 }}>
            <Box component="img" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/3a20c394-6d7f-48d4-a8b9-38c3309a1b27/b8589637-28d7-4d2a-8b20-15ce8a12a4cd.png" alt="User 3" sx={{ width: '100%', borderRadius: '8px' , height:'250px' }} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>Nelson Vung</Typography>
            <Typography variant="body2">Software Developer</Typography>
            <Typography variant="body2">nelson@gmail.com</Typography>
            <Button variant="contained" sx={{ marginTop: 1 }}>Contact</Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </section>
</Box>
    </Box>
  );
}

export default AboutUs;

import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Snackbar, Alert, Switch, Divider, Grid, Card, CardContent, Paper, Modal, TextField
} from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, Mail as MailIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // For navigation
import welcomeBg from './assets/meeting-bg.jpg';

function AboutUs() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  // Toggle drawer open/close
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setSnackbarOpen(true);
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({ username: data.username, email: data.email, message: '' });
        return true; // User data fetched successfully
      }
      return false; // Failed to fetch user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false; // Error occurred
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleModalOpen = async () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      const userFetched = await fetchUserData();
      if (userFetched) {
        setModalOpen(true); // Open the modal if user data was fetched
      } else {
        navigate('/login'); // Redirect if user data fetching failed
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = () => {
    // Simulate sending the message
    setSnackbarOpen(true);
    setModalOpen(false);
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'About', 'Contact'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <HomeIcon /> : index === 1 ? <InfoIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#E8F5E9', flexGrow: 1 }}>
      {/* Enlarged Carousel Section */}
      <Box
        sx={{
          backgroundImage: `url(${welcomeBg})`,
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '10%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ color: '#fff', textAlign: 'left', maxWidth: '600px' }}>
          <Typography variant="h3">Here's the Story of Housing Master</Typography>
          <Divider sx={{ bgcolor: 'yellow', height: 2, width: '20%', my: 2 }} />
          <Typography variant="body1">
            House Master is a platform dedicated to providing the best insights into the housing market. We combine data
            analytics with machine learning to help homeowners and potential buyers make informed decisions.
          </Typography>
        </Box>
      </Box>

      {/* Meet Our Team Section */}
      <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <section className="team">
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>Meet Our Team</Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: '1200px' }}>
            {/* Card 1 */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ width: '350px' }}>
                <Box sx={{ padding: 1.5 }}>
                  <Box
                    component="img"
                    src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/242ba782-d237-4767-8ca4-07024fcd84c0/cc1bc566-201d-4df3-b535-c1c280e2cbc0.png"
                    alt="User 1"
                    sx={{ width: '100%', borderRadius: '8px', height: '250px' }}
                  />
                  <Typography variant="h6" sx={{ marginTop: 1 }}>Gabriel</Typography>
                  <Typography variant="body2">Software Developer</Typography>
                  <Typography variant="body2">gabriel@gmail.com</Typography>
                  <Button variant="contained" sx={{ marginTop: 1 }} onClick={handleModalOpen}>
                    Contact
                  </Button>
                </Box>
              </Card>
            </Grid>
            {/* Card 2 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ width: '350px' }}>
          <Box sx={{ padding: 1.5 }}>
            <Box component="img" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/b3809ffe-b67d-4c71-8cc7-26a4bba632bb/eef15880-ddc7-4fd0-a4af-154fc5835d05.png" alt="User 2" sx={{ width: '100%', borderRadius: '8px', height:'250px' }} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>Liew Jun Yang</Typography>
            <Typography variant="body2">Software Developer</Typography>
            <Typography variant="body2">jun@gmail.com</Typography>
            <Button variant="contained" sx={{ marginTop: 1 }} onClick={handleModalOpen}>Contact</Button>
          </Box>
        </Card>
      </Grid>

      {/* Card 3 */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ width: '350px' }}>
          <Box sx={{ padding: 1.5 }}>
            <Box component="img" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/3a20c394-6d7f-48d4-a8b9-38c3309a1b27/b8589637-28d7-4d2a-8b20-15ce8a12a4cd.png" alt="User 3" sx={{ width: '100%', borderRadius: '8px' , height:'250px' }} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>Nelson Vung</Typography>
            <Typography variant="body2">Software Developer</Typography>
            <Typography variant="body2">nelson@gmail.com</Typography>
            <Button variant="contained" sx={{ marginTop: 1 }} onClick={handleModalOpen}>Contact</Button>
          </Box>
        </Card>
      </Grid>
      </Grid>
        </section>
      </Box>

      {/* Modal for Contact Form */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Contact Us</Typography>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            disabled // Disable input if auto-filled
          />
          <TextField
            fullWidth
            label="Gmail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            disabled // Disable input if auto-filled
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
            <Button variant="outlined" color="secondary" onClick={handleModalClose}>Discard</Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default AboutUs;
