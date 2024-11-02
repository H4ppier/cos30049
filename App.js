// // // src/App.js

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import PricePrediction from './pages/PricePrediction';
// // import AboutUs from './pages/AboutUs';
// // import Login from './pages/Login';
// // import Register from './pages/Register';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Navbar />
// //         <Routes>
// //           <Route path="/price-prediction" element={<PricePrediction />} />
// //           <Route path="/about-us" element={<AboutUs />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


import React, { useState, useEffect  } from 'react';
import {AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider, Paper, CssBaseline, Breadcrumbs  } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, Mail as MailIcon, Add as AddIcon,} from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link , useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import "./App.css"
// import RegisterPage from "./signin";
import RegisterPage from "./signup";
import LandingPage from "./LandingPage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Prediction from "./Prediction";
import Profile from "./Profile";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function App() {

    
const navigate = useNavigate();
const [openDrawer, setOpenDrawer] = useState(false);
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update isAuthenticated based on the presence of a token
  }, []);


  // Handle logout function
  function handleLogout() {
    localStorage.removeItem('token'); // Remove JWT token
    setIsAuthenticated(false); // Update state to reflect logout
    navigate('/login'); // Redirect to login page
  }
  
const handleDrawerToggle = () => {
      setOpenDrawer(!openDrawer);

  };
  
  const drawerContent = (
    <List>
      <ListItem button component={Link} to="/">
        <HomeIcon sx={{ mr: 2, color: 'black' }} />
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/prediction">
        <ListItemText primary="Price Prediction" />
      </ListItem>
      <ListItem button component={Link} to="/about">
        <ListItemText primary="About Us" />
      </ListItem>
      {isAuthenticated ? (
        <>
          <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </List>
  );

return (
    
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            <Link to="/">
              <HomeIcon sx={{ mr: 4, color: 'black' }} />
            </Link>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', fontweigth: 'bold'}}>
            House Master
          </Typography>
          <Button component={Link} to="/prediction" color ="inherit" sx = {{flexGrow: 1, color: 'black'}}>Price Prediction</Button>
          <Button component={Link} to="/about" color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>About Us</Button>
          {isAuthenticated ? (
                <>
                  <Button component={Link} to="/profile" color="inherit" sx={{ color: 'black' }}>Profile </Button>                
                  <Button onClick={handleLogout} color="inherit" sx={{ color: 'black' }}>Logout</Button>
                   
                </>
              ) : (
                <>
          <Button component={Link} to="/login" color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Login</Button>
          {/* <Button color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Register</Button> */}
          <Button component={Link} to="/register" color="inherit" sx={{ color: 'black' }}>Register</Button>
          </>
        )}
          </>
          )}
      </Toolbar>
    </AppBar>

    <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/prediction" element={<Prediction />} />
  <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass the prop */}
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/profile" element={<Profile />} />
</Routes>


    <Box sx={{backgroundColor: 'white',color: 'black', padding: '20px 0', marginTop: 'auto', borderTop: '1px solid', borderColor: 'divider',}}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} textAlign="center">
          <Typography variant="h6" gutterBottom>
            House Master
          </Typography>
          <Link to="/prediction" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            Prediction
          </Link>
          <br />
          <Link to="/about" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            About Us
          </Link>
          <br />
          <Link to="/careers" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            Something
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <Link href="https://facebook.com" color="inherit">
              <FacebookIcon sx={{ fontSize: 30, mr: 1, color: 'black' }} />
            </Link>
            <Link href="https://twitter.com" color="inherit">
              <TwitterIcon sx={{ fontSize: 30, mr: 1, color: 'black' }} />
            </Link>
            <Link href="https://instagram.com" color="inherit">
              <InstagramIcon sx={{ fontSize: 30, color: 'black' }} />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="inherit">
          Copyright © {new Date().getFullYear()} House Master 
        </Typography>
      </Box>
    </Box>
  </Box>
  );
}

export default App;


// // // src/App.js

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import PricePrediction from './pages/PricePrediction';
// // import AboutUs from './pages/AboutUs';
// // import Login from './pages/Login';
// // import Register from './pages/Register';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Navbar />
// //         <Routes>
// //           <Route path="/price-prediction" element={<PricePrediction />} />
// //           <Route path="/about-us" element={<AboutUs />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


import React, { useState, useEffect  } from 'react';
import {AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider, Paper, CssBaseline, Breadcrumbs  } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, Mail as MailIcon, Add as AddIcon,} from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link , useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import "./App.css"
// import RegisterPage from "./signin";
import RegisterPage from "./signup";
import LandingPage from "./LandingPage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Prediction from "./Prediction";
import Profile from "./Profile";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function App() {

    
const navigate = useNavigate();
const [openDrawer, setOpenDrawer] = useState(false);
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update isAuthenticated based on the presence of a token
  }, []);


  // Handle logout function
  function handleLogout() {
    localStorage.removeItem('token'); // Remove JWT token
    setIsAuthenticated(false); // Update state to reflect logout
    navigate('/login'); // Redirect to login page
  }
  
const handleDrawerToggle = () => {
      setOpenDrawer(!openDrawer);

  };
  
  const drawerContent = (
    <List>
      <ListItem button component={Link} to="/">
        <HomeIcon sx={{ mr: 2, color: 'black' }} />
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/prediction">
        <ListItemText primary="Price Prediction" />
      </ListItem>
      <ListItem button component={Link} to="/about">
        <ListItemText primary="About Us" />
      </ListItem>
      {isAuthenticated ? (
        <>
          <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
    </List>
  );

return (
    
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            <Link to="/">
              <HomeIcon sx={{ mr: 4, color: 'black' }} />
            </Link>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', fontweigth: 'bold'}}>
            House Master
          </Typography>
          <Button component={Link} to="/prediction" color ="inherit" sx = {{flexGrow: 1, color: 'black'}}>Price Prediction</Button>
          <Button component={Link} to="/about" color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>About Us</Button>
          {isAuthenticated ? (
                <>
                  <Button component={Link} to="/profile" color="inherit" sx={{ color: 'black' }}>Profile </Button>                
                  <Button onClick={handleLogout} color="inherit" sx={{ color: 'black' }}>Logout</Button>
                   
                </>
              ) : (
                <>
          <Button component={Link} to="/login" color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Login</Button>
          {/* <Button color = "inherit" sx = {{flexGrow: 1, color: 'black'}}>Register</Button> */}
          <Button component={Link} to="/register" color="inherit" sx={{ color: 'black' }}>Register</Button>
          </>
        )}
          </>
          )}
      </Toolbar>
    </AppBar>

    <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/about" element={<AboutUs isAuthenticated={isAuthenticated}/>} />
  <Route path="/prediction" element={<Prediction />} />
  <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass the prop */}
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/profile" element={<Profile />} />
</Routes>


    <Box sx={{backgroundColor: 'white',color: 'black', padding: '20px 0', marginTop: 'auto', borderTop: '1px solid', borderColor: 'divider',}}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} textAlign="center">
          <Typography variant="h6" gutterBottom>
            House Master
          </Typography>
          <Link to="/prediction" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            Prediction
          </Link>
          <br />
          <Link to="/about" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            About Us
          </Link>
          <br />
          <Link to="/careers" sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}>
            Something
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <Link href="https://facebook.com" color="inherit">
              <FacebookIcon sx={{ fontSize: 30, mr: 1, color: 'black' }} />
            </Link>
            <Link href="https://twitter.com" color="inherit">
              <TwitterIcon sx={{ fontSize: 30, mr: 1, color: 'black' }} />
            </Link>
            <Link href="https://instagram.com" color="inherit">
              <InstagramIcon sx={{ fontSize: 30, color: 'black' }} />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="inherit">
          Copyright © {new Date().getFullYear()} House Master 
        </Typography>
      </Box>
    </Box>
  </Box>
  );
}

export default App;
