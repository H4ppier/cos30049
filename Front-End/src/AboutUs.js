import React, { useState, useEffect } from 'react';
import {Typography, Button, Box, Grid, Card, Modal, TextField, Snackbar, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import welcomeBg from './meeting-bg.jpg'; 

function AboutUs({ isAuthenticated }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();

  // Fetch user data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); // Updated to match Profile.js
      if (!token) {
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ username: response.data.username, email: response.data.email, message: '' });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleModalOpen = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setModalOpen(true); // Open the modal if the user is logged in
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setMessageError(''); // Clear error message when modal is closed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'message' && value.trim() === '') {
      setMessageError('Message cannot be empty');
    } else {
      setMessageError('');
    }
  };
  
  const handleSend = () => {
    if (formData.message.trim() === '') {
      setMessageError('Message cannot be empty');
      return;
    }
    // Simulate sending the message
    setSnackbarOpen(true);
    setModalOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#e5ffcc', flexGrow: 1 }}>
      {/* Carousel Section */}
      <Box sx={{backgroundImage: `url(${welcomeBg})`,height: '500px',display: 'flex',alignItems: 'center',justifyContent: 'flex-start',paddingLeft: '10%',backgroundSize: 'cover',backgroundPosition: 'center' }} >
        <Box sx={{ color: '#fff', textAlign: 'left', maxWidth: '600px' }}>
          <Typography variant="h3">Here's the Story of Housing Master</Typography>
          <Typography variant="body1">
            House Master is a platform dedicated to providing the best insights into the housing market.
          </Typography>
        </Box>
      </Box>

      {/* Team Section */}
      <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <section className="team">
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: '1200px' }}>
          {/* Example Team Member Card */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ width: 'auto', background: 'linear-gradient(to right, #c3f0a2, #aef4c9)'}}>
              <Box sx={{ padding: 1.5 }}>
                <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/242ba782-d237-4767-8ca4-07024fcd84c0/cc1bc566-201d-4df3-b535-c1c280e2cbc0.png" alt="User 1" style={{ width: '100%', borderRadius: '8px', height: '250px' }} />
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
          <Card sx={{ width: 'auto', background: 'linear-gradient(to right, #c3f0a2, #aef4c9)' }}>
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
          <Card sx={{ width: 'auto', background: 'linear-gradient(to right, #c3f0a2, #aef4c9)' }}>
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
        {/* Contact Modal */}
        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
            <Typography variant="h6">Contact Us</Typography>
            <TextField fullWidth label="Username" value={formData.username} disabled sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" value={formData.email} disabled sx={{ mb: 2 }} />
            <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleInputChange} multiline rows={4} sx={{ mb: 2 }} error={!!messageError} helperText={messageError} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={handleModalClose}>Discard</Button>
              <Button variant="contained" color="primary" onClick={handleSend} disabled={!!messageError} >
                Send
              </Button>
            </Box>
          </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AboutUs;