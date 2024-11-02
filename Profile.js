import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [history, setHistory] = useState([]); // State for history

  // Fetch user data and prediction history on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token
          return;
        }

        setLoading(true); // Set loading state

        // Fetch user profile and prediction history concurrently
        const [userResponse, historyResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/get-history', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Set user and history state
        setUser({
          username: userResponse.data.username,
          email: userResponse.data.email,
        });
        setHistory(historyResponse.data); // Set the fetched history
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleSave = async () => {
    // Basic validation
    const newErrors = {};
    if (!user.username) {
      newErrors.username = 'Username is required';
    }
    if (!user.email) {
      newErrors.email = 'Email is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://127.0.0.1:8000/profile',
        { username: user.username, email: user.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Profile updated successfully');
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Show a loading message while fetching data
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E5F4E5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#FFFFFF', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profile Page
          </Typography>
          {message && <Typography color="success.main">{message}</Typography>}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errors.username}
              helperText={errors.username}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                Save Changes
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#FFFFFF' }}>
          <Typography variant="h5" gutterBottom>
            Prediction History
          </Typography>
          {history.length === 0 ? (
            <Typography>No prediction history found.</Typography>
          ) : (
            <List>
              {history.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`Predicted Price: ${item.predicted_price}`}
                      secondary={`Floor Area: ${item.floor_area_sqm} sqm, Lease: ${item.remaining_lease_months} months`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Profile;
