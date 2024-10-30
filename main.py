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

# # Load test dataset and get predicted prices
# test_data_X = pd.read_csv('X_test.csv')
# test_data_y = pd.read_csv('y_test.csv')

# # Combine the features and target variable for predictions
# test_data = pd.concat([test_data_X, test_data_y], axis=1)

# # Make predictions on the test dataset
# test_predictions = model.predict(test_data)

# Create a directory for saving plots if it doesn't exist
if not os.path.exists("plots"):
    os.makedirs("plots")

class HouseData(BaseModel):
    date_listed: str  # Expecting date in 'YYYY-MM-DD' format
    floor_area_sqm: float
    remaining_lease_month: int
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
    
    # Apply one-hot encoding
    df_encoded = pd.get_dummies(df, columns=[
        'flat_type', 'storey_range', 'flat_model', 'region_ura', 'transport_type', 'line_color'
    ])
    
    # Align encoded DataFrame with model's training features
    model_features = model.feature_names_in_
    for col in model_features:
        if col not in df_encoded.columns:
            df_encoded[col] = 0  # Add missing columns with zeros
    
    return df_encoded[model_features]

@app.post("/predict")
def predict(house: HouseData):
    # Prepare the input data for the model
    input_data = house.dict()
    processed_data = preprocess_input(input_data)

    # Make the prediction for the user's input
    prediction = model.predict(processed_data)

    # Send both the current prediction and test dataset predictions
    return {
        "prediction": prediction[0],
        # "test_predictions": test_predictions.tolist()  # Convert to list for JSON serialization
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
