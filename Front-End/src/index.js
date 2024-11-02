import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
    {/* Wrap the app in ThemeProvider and pass the theme for consistent styling*/}
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <App />
        </Router>
    </ThemeProvider>
    </React.StrictMode>
);