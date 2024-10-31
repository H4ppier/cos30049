from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import os
from datetime import datetime

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL of your React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained machine learning model using pickle
with open('linear_regression_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Uncomment the scaler loading if needed
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Load test data
test_data = pd.read_csv("../src/X_test.csv")  # Load your test dataset

def predict_test_data():
    df = test_data.copy()

    # Make predictions on the scaled test data
    scaled_predictions = model.predict(df)

    # Create a DataFrame for inverse transformation
    # We will need to create a DataFrame that contains all features that were scaled
    # to perform the inverse transformation correctly.
    scaled_df = df.copy()
    scaled_df['predicted_price'] = scaled_predictions

    # Inverse transform for the features you scaled
    # Only include the columns that were originally scaled
    numerical_columns = [
        'remaining_lease_months', 'floor_area_sqft', 'price_per_sqft', 
        'distance_to_mrt_meters', 'distance_to_cbd', 'distance_to_pri_school_meters'
    ]
    
    # Assuming 'scaler' was fitted on these columns
    unscaled_values = scaler.inverse_transform(scaled_df[numerical_columns])

    # Update the DataFrame with unscaled values
    for i, col in enumerate(numerical_columns):
        scaled_df[col] = unscaled_values[:, i]

    return scaled_df[['floor_area_sqft', 'predicted_price']]  # Columns for scatter plot


class HouseData(BaseModel):
    date_listed: str  # Expecting date in 'YYYY-MM-DD' format
    floor_area_sqm: float
    remaining_lease_months: int
    floor_area_sqft: float
    price_per_sqft: float
    distance_to_mrt_meters: float
    distance_to_cbd: float
    distance_to_pri_school_meters: float
    flat_type: str
    storey_range: str
    flat_model: str
    region_ura: str
    transport_type: str
    line_color: str

def preprocess_input(data: dict):
    # Convert 'date_listed' to Unix timestamp
    date_obj = datetime.strptime(data['date_listed'], "%Y-%m-%d")
    data['date_listed'] = int(date_obj.timestamp())

    # Convert input data to DataFrame
    df = pd.DataFrame([data])

    # Scale numerical features using the scaler
    numerical_columns = [
        'remaining_lease_months', 'floor_area_sqft', 'price_per_sqft', 
        'distance_to_mrt_meters', 'distance_to_cbd', 'distance_to_pri_school_meters'
    ]
    
    # Scale the numerical features
    df[numerical_columns] = scaler.transform(df[numerical_columns])

    # One-hot encoding for categorical fields
    df_encoded = pd.get_dummies(df, columns=[
        'flat_type', 'storey_range', 'flat_model', 'region_ura', 'transport_type', 'line_color'
    ])

    # Align encoded DataFrame with model features
    model_features = model.feature_names_in_
    for col in model_features:
        if col not in df_encoded.columns:
            df_encoded[col] = 0  # Fill missing columns with zeros

    # Ensure correct ordering of features
    return df_encoded[model_features]

@app.post("/predict")
def predict(house: HouseData):
    # Prepare input data for prediction
    input_data = house.dict()
    processed_data = preprocess_input(input_data)

    # Make prediction
    scaled_prediction = model.predict(processed_data)

    return {"prediction": scaled_prediction[0]}  # Return first prediction

@app.get("/scatter-data")
def scatter_data():
    test_predictions = predict_test_data()
    return {
        "scatter_data": test_predictions.to_dict(orient="records")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
