import React, { useState, useEffect } from 'react';
import {Typography, Button, Box, TextField, LinearProgress, Grid, Card, CardContent, MenuItem, Snackbar, Alert, CircularProgress} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './index.css';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);
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
    const [leaseHistogramData, setLeaseHistogramData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [scatterChartData, setScatterChartData] = useState(null);  // Scatter plot data
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state
    const [errorNotification, setErrorNotification] = useState(null); // Error notification state
    const [firstPredictionMade, setFirstPredictionMade] = useState(false); 

    const regexPatterns = {
        floor_area_sqm: /^\d+(\.\d{1,2})?$/,           // Allows integers or decimal up to 2 places
        remaining_lease_months: /^\d+$/,               // Integer only
        floor_area_sqft: /^\d+(\.\d{1,2})?$/,          // Allows integers or decimal up to 2 places
        price_per_sqft: /^\d+(\.\d{1,2})?$/,           // Allows integers or decimal up to 2 places
        distance_to_mrt_meters: /^\d+(\.\d{1,2})?$/,   // Allows integers or decimal up to 2 places
        distance_to_cbd: /^\d+(\.\d{1,2})?$/,          // Allows integers or decimal up to 2 places
        distance_to_pri_school_meters: /^\d+(\.\d{1,2})?$/  // Allows integers or decimal up to 2 places
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

    const fetchPrediction = async () => {
        if (validate()) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error('Server responded with an error.');
                }
                const result = await response.json();
                setPredictedPrice(result.prediction);
                setFirstPredictionMade(true);
    
                // Save the prediction history
                const token = localStorage.getItem('token');
                await fetch('http://localhost:8000/save-history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...formData, predicted_price: result.prediction }),
                });
    
                // Fetch the test dataset predictions
                const scatterResponse = await fetch('http://localhost:8000/scatter-data');
                const scatterResult = await scatterResponse.json();
    
                const chosenModelWithPrefix = `flat_model_${formData.flat_model}`;
                const distributionResponse = await fetch(`http://localhost:8000/flat-model-distribution?chosen_model=${chosenModelWithPrefix}`);
                const distributions = await distributionResponse.json();
    
                // Fetch remaining lease distribution and pass the user input
                const leaseResponse = await fetch(`http://localhost:8000/remaining-lease-distribution?user_lease=${formData.remaining_lease_months}`);
                const leaseData = await leaseResponse.json();
    
                // Scatter Chart Data
                setScatterChartData({
                    datasets: [
                        {
                            label: "Predicted Prices (Test Data)",
                            data: scatterResult.scatter_data.map((dataPoint) => ({
                                x: dataPoint.floor_area_sqft,
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
    
                // Find the index of the chosen model for highlighting
                const chosenModelIndex = Object.keys(distributions).indexOf(chosenModelWithPrefix);
                const highlightColor = "rgba(255, 99, 132, 1)"; // Color for highlighting
                const defaultColors = ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"];
    
                // Distributions Bar Chart Data
                setBarChartData({
                    labels: Object.keys(distributions), // Model names
                    datasets: [
                        {
                            label: "Flat Model Distributions",
                            data: Object.keys(distributions).map((model, index) =>
                                index === chosenModelIndex ? 0 : distributions[model] // Exclude the user's selected model
                            ),
                            backgroundColor: Object.keys(distributions).map((_, index) =>
                                index === chosenModelIndex ? "rgba(0, 0, 0, 0)" : defaultColors[index % defaultColors.length] // Transparent for excluded bars
                            ),
                        },
                        {
                            label: "User's Selected Flat Model",
                            data: Object.keys(distributions).map((_, index) =>
                                index === chosenModelIndex ? distributions[chosenModelWithPrefix] : 0 // Only include the user's selected model
                            ),
                            backgroundColor: "rgba(255, 99, 132, 1)", // Highlight color for the user's model
                        },
                    ],
                });

                // Highlight the user's input in the histogram
                const userLeaseValue = Number(formData.remaining_lease_months); // Convert to number if necessary

                // Prepare data for the histogram
                setLeaseHistogramData({
                    labels: leaseData.lease_values, // Lease range labels
                    datasets: [
                        {
                            label: "Remaining Lease Count Distribution",
                            data: leaseData.lease_values.map(value =>
                                Number(value) === userLeaseValue ? 0 : leaseData.frequencies[leaseData.lease_values.indexOf(value)]
                            ), // Exclude the user's value from this dataset
                            backgroundColor: "rgba(75, 192, 192, 0.6)", // Default color for other bars
                        },
                        {
                            label: "User's Selected Remaining Lease",
                            data: leaseData.lease_values.map(value =>
                                Number(value) === userLeaseValue ? leaseData.frequencies[leaseData.lease_values.indexOf(value)] : 0
                            ), // Only include the user's value in this dataset
                            backgroundColor: "rgba(255, 99, 132, 1)", // Highlight color for the user's value
                        },
                    ],
                });

            } catch (error) {
                setErrorNotification('An error occurred while fetching the prediction. Please try again.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorNotification("Validation failed. Please correct the highlighted fields.");
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrediction();
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    useEffect(() => {
        if (firstPredictionMade) {
            fetchPrediction();
        }
    }, [formData]); 

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

                            <Grid item xs = {12} sx = {{mt: 'auto', justifyContent: 'center', alignItems: 'center', display: 'flex'   }}>
                                <Button variant="contained" type="submit" color="primary" sx = {{alignItems: 'center', background: '#67c6a5', color: 'white', borderRadius: '50px', padding: '10px 20px', fontWeight: 'bold', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', textTransform: 'none', width: '25%', '&:hover': {background: 'linear-gradient(90deg, #56ab8f, #68c3ea)'}, marginTop: '20px', }}>Predict</Button>
                            </Grid>    
                        </Grid>
                    </form>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {predictedPrice !== null && !loading && (
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6">Predicted Price: {formatPrice(predictedPrice)}</Typography>
                            {/* Scatter Plot */}
                            {scatterChartData && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6">Scatter Plot of Predicted Prices</Typography>
                                    <Scatter 
                                        data={scatterChartData} 
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                zoom: {
                                                    zoom: {
                                                        wheel: {
                                                            enabled: true, // Enable zooming with the mouse wheel
                                                        },
                                                        pinch: {
                                                            enabled: true, // Enable zooming by pinching on touch devices
                                                        },
                                                        mode: 'xy', // Zoom both axes
                                                    },
                                                    pan: {
                                                        enabled: true,
                                                        mode: 'xy', // Pan both axes
                                                    },
                                                },
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Zoomable Scatter Plot of Predicted Prices',
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    title: {
                                                        display: true,
                                                        text: 'Floor Area (sq ft)',
                                                    },
                                                },
                                                y: {
                                                    title: {
                                                        display: true,
                                                        text: 'Predicted Price',
                                                    },
                                                    beginAtZero: true,
                                                },
                                            },
                                        }} 
                                    />
                                </Box>
                            )}

                            {/* Render the histogram if data is available */}
                            {barChartData && (
                                <div style={{ marginTop: '20px' }}>
                                    <Typography variant="h6">Flat model Distributions</Typography>
                                    <Bar
                                        data={barChartData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Distribution of Various Attributes',
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    title: {
                                                        display: true,
                                                        text: 'Attributes',
                                                    },
                                                },
                                                y: {
                                                    title: {
                                                        display: true,
                                                        text: 'Frequency',
                                                    },
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            )}
                            
                            {leaseHistogramData && (
                                <div style={{ marginTop: '20px' }}>
                                    <Typography variant="h6">Remaining Lease Distribution Histogram</Typography>
                                    <Bar
                                        data={leaseHistogramData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Distribution of Remaining Lease',
                                                },
                                                zoom: {
                                                    pan: {
                                                        enabled: true,
                                                        mode: 'x', // Allows horizontal panning only
                                                    },
                                                    zoom: {
                                                        wheel: {
                                                            enabled: true, // Enables zoom on mouse wheel
                                                        },
                                                        pinch: {
                                                            enabled: true, // Enables zoom on pinch for touch devices
                                                        },
                                                        mode: 'x', // Allows horizontal zoom only
                                                    },
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    title: {
                                                        display: true,
                                                        text: 'Remaining Lease (Months)',
                                                    },
                                                },
                                                y: {
                                                    title: {
                                                        display: true,
                                                        text: 'Frequency',
                                                    },
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </Box>
                    )}

                    <Snackbar open={!!errorNotification} autoHideDuration={6000} onClose={() => setErrorNotification(null)}>
                        <Alert onClose={() => setErrorNotification(null)} severity="error" sx={{ width: '100%' }}>
                            {errorNotification}
                        </Alert>
                    </Snackbar>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Prediction;