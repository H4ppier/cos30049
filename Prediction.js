import React, { useEffect, useState } from 'react';
import {
    Typography, Button, Box, TextField, LinearProgress, Grid, Card, CardContent, MenuItem
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import './index.css';
import axios from "axios";

// Register Chart.js components, including PointElement
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend, Title);

function Prediction() {
    const [formData, setFormData] = useState({
        date_listed: '',
        floor_area_sqm: '',
        remaining_lease_months: '',
        floor_area_sqft: '',
        price_per_sqft: '',
        distance_to_mrt_meters: '',
        distance_to_cbd: '',
        distance_to_pri_school_meters: '',
        flat_type: '',
        storey_range: '',
        flat_model: '',
        region_ura: '',
        transport_type: '',
        line_color: ''
    });

    const [predictedPrice, setPredictedPrice] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [scatterChartData, setScatterChartData] = useState(null);  // Scatter plot data
    const [errors, setErrors] = useState({});

    const regexPatterns = {
        floor_area_sqm: /^\d{1,5}$/,
        remaining_lease_months: /^\d+$/,
        floor_area_sqft: /^\d{1,5}$/,
        price_per_sqft: /^\d+$/,
        distance_to_mrt_meters: /^\d+$/,
        distance_to_cbd: /^\d+$/,
        distance_to_pri_school_meters: /^\d+$/
    };

    const totalFields = 14; // Total number of fields
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const progress = (filledFields / totalFields) * 100; // Percentage completed

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        Object.keys(regexPatterns).forEach((key) => {
            if (!regexPatterns[key].test(formData[key])) {
                newErrors[key] = `${key.replace(/_/g, ' ')} must be a valid number`;
                valid = false;
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // Fetch prediction for the user input
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                setPredictedPrice(result.prediction);
    
                // Fetch the test dataset predictions
                const scatterResponse = await fetch('http://localhost:8000/scatter-data');
                const scatterResult = await scatterResponse.json();
    
                // Set Scatter Chart Data
                setScatterChartData({
                    datasets: [
                        {
                            label: "Predicted Prices (Test Data)",
                            data: scatterResult.scatter_data.map((dataPoint) => ({
                                x: dataPoint.floor_area_sqft,  // Replace with the appropriate feature name
                                y: dataPoint.predicted_price,
                            })),
                            backgroundColor: "rgba(99, 132, 255, 0.5)",
                            pointRadius: 5,
                        },
                        {
                            label: "Current Prediction",
                            data: [{ x: formData.floor_area_sqft, y: result.prediction }],
                            backgroundColor: "rgba(255, 99, 132, 1)",
                            pointRadius: 8,
                        },
                    ],
                });
    
                // Set other charts (if needed)
                setBarChartData({
                    labels: ["Predicted Price", "Floor Area (sqm)", "Price per Sqft", "Remaining Lease (months)"],
                    datasets: [
                        {
                            label: "Values",
                            data: [
                                result.prediction,
                                parseFloat(formData.floor_area_sqm),
                                parseFloat(formData.price_per_sqft),
                                parseInt(formData.remaining_lease_months)
                            ],
                            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)", "rgba(255, 206, 86, 0.6)"],
                        },
                    ],
                });
    
                setLineChartData({
                    labels: ["-10% Floor Area", "-5% Floor Area", "Current Prediction", "+5% Floor Area", "+10% Floor Area"],
                    datasets: [
                        {
                            label: "Predicted Price with Floor Area Adjustment",
                            data: [
                                result.prediction * 0.9,
                                result.prediction * 0.95,
                                result.prediction,
                                result.prediction * 1.05,
                                result.prediction * 1.1
                            ],
                            fill: false,
                            borderColor: "rgba(75, 192, 192, 1)",
                            tension: 0.1,
                        },
                    ],
                });
    
                setPieChartData({
                    labels: ["Floor Area (sqm)", "Remaining Lease (months)", "Distance to CBD (m)"],
                    datasets: [
                        {
                            data: [
                                parseFloat(formData.floor_area_sqm),
                                parseInt(formData.remaining_lease_months),
                                parseFloat(formData.distance_to_cbd)
                            ],
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        },
                    ],
                });
    
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("Validation failed");
        }
    };
    


    return(
        <Grid container sx = {{minHeight: '100vh', bgcolor: '#e5ffcc'}}>
            <Card sx={{ width: '80%', margin: 'auto', marginTop: 4, padding: 2, borderRadius: '16px', background: 'linear-gradient(to right, #c3f0a2, #aef4c9)' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>Housing Details Form</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing = {2}>
                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Date Listed" name="date_listed" type = "date" value={formData.date_listed} onChange={handleChange} error = {!!errors.date_listed} helperText = {errors.date_listed} FormHelperTextProps={{sx: {bgcolor: 'transparent'}}} fullWidth required InputLabelProps={{shrink: true}} />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Floor Area (sqm)" name="floor_area_sqm" value={formData.floor_area_sqm} onChange={handleChange} error = {!!errors.floor_area_sqm} helperText = {errors.floor_area_sqm} FormHelperTextProps={{sx: {bgcolor: 'transparent'}}} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Remaining Lease (months)" name="remaining_lease_months" value={formData.remaining_lease_months} onChange={handleChange} error = {!!errors.remaining_lease_months} helperText = {errors.remaining_lease_months} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Floor Area (sqft)" name="floor_area_sqft" value={formData.floor_area_sqft} onChange={handleChange} error = {!!errors.floor_area_sqft} helperText = {errors.floor_area_sqft} FormHelperTextProps={{sx: {bgcolor: 'transparent'}}} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Price per Sqft" name="price_per_sqft" value={formData.price_per_sqft} onChange={handleChange} error = {!!errors.price_per_sqft} helperText = {errors.price_per_sqft} FormHelperTextProps={{sx: {bgcolor: 'transparent'}}} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Distance to MRT (meters)" name="distance_to_mrt_meters" value={formData.distance_to_mrt_meters} onChange={handleChange} error = {!!errors.distance_to_mrt_meters} helperText = {errors.distance_to_mrt_meters} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Distance to CBD" name="distance_to_cbd" value={formData.distance_to_cbd} onChange={handleChange} error = {!!errors.distance_to_cbd} helperText = {errors.distance_to_cbd} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} label="Distance to Primary School (meters)" name="distance_to_pri_school_meters" value={formData.distance_to_pri_school_meters} onChange={handleChange} error = {!!errors.distance_to_pri_school_meters} helperText = {errors.distance_to_pri_school_meters} fullWidth required />
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }}  select label="Flat Type" name="flat_type" value={formData.flat_type} onChange={handleChange} fullWidth required>
                                    {['1 room', '2 room', '3 room', '4 room', 'executive'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} select label="Storey Range" name="storey_range" value={formData.storey_range} onChange={handleChange} fullWidth required>
                                    {['01 TO 03', '04 TO 06', '07 TO 09', '10 TO 12', '13 TO 15', '16 TO 18', '19 TO 21', '22 TO 24', '25 TO 27', '28 TO 30', '31 TO 33', '34 TO 36', '37 TO 39', '40 TO 42', '43 TO 45', '46 TO 48'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))} 
                                </TextField>
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} select label="Flat Model" name="flat_model" value={formData.flat_model} onChange={handleChange} fullWidth required>
                                    {['2-room', 'Adjoined flat', 'Apartment', 'DBSS', 'Improved', 'Maisonette', 'Model A', 'Model A2', 'New Generation', 'Premium Apartment', 'Premium Apartment Loft', 'Premium Maisonette', 'Simplified', 'Standard', 'Terrace', 'Type S1', 'Type S2'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} select label="Region (URA)" name="region_ura" value={formData.region_ura} onChange={handleChange} fullWidth required>
                                    {['central region', 'east region', 'north region', 'north-east region', 'west region'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} select label="Transport Type" name="transport_type" value={formData.transport_type} onChange={handleChange} fullWidth required>
                                    {['LRT', 'MRT'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs = {12} sm = {6}>
                                <TextField sx = {{bgcolor: '#dfead9' }} select label="Line Color" name="line_color" value={formData.line_color} onChange={handleChange} fullWidth required>
                                    {['blue', 'brown', 'green', 'grey', 'orange', 'purple', 'red'].map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item sx={{ width: '100%', marginTop: '20px' }}>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
                                <Typography align="center" variant="body2" sx={{ marginTop: 1 }}>{`${Math.round(progress)}% completed`}</Typography>
                            </Grid>

                            <Grid item xs = {12} sx = {{mt: 'auto'}}>
                                <Button variant="contained" type="submit" color="primary" sx = {{background: '#67c6a5', color: 'white', borderRadius: '50px', padding: '10px 20px', fontWeight: 'bold', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', textTransform: 'none', width: '25%', '&:hover': {background: 'linear-gradient(90deg, #56ab8f, #68c3ea)'}, marginTop: '20px', }}>Predict</Button>
                            </Grid>
                            
                        </Grid>
                    </form>

                    {predictedPrice !== null && (
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6">Predicted Price: ${predictedPrice.toFixed(2)}</Typography>

                            {/* Bar Chart */}
                            {barChartData && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6">Feature Comparison</Typography>
                                    <Bar data={barChartData} />
                                </Box>
                            )}

                            {/* Line Chart */}
                            {lineChartData && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6">Price Prediction Adjustments</Typography>
                                    <Line data={lineChartData} />
                                </Box>
                            )}

                            {/* Pie Chart */}
                            {pieChartData && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6">Feature Breakdown</Typography>
                                    <Pie data={pieChartData} />
                                </Box>
                            )}

                            {/* Scatter Plot */}
                            {scatterChartData && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6">Scatter Plot of Predicted Prices</Typography>
                                    <Scatter data={scatterChartData} />
                                </Box>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Prediction;
