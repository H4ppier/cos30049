from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle  # Import pickle for loading the model

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
    model = pickle.load(f)  # Load the model

class HouseData(BaseModel):
    floor_area_sqm: float
    remaining_lease_month: int
    distance_to_mrt_meters: float
    distance_to_cbd: float
    distance_to_pri_school_meters: float
    flat_type: str
    storey_range: int
    flat_model: str
    region_ura: str
    transport_type: str
    line_color: str

@app.post("/predict")
def predict(house: HouseData):
    # Prepare the input data for the model
    input_data = [[
        house.floor_area_sqm,
        house.remaining_lease_month,
        house.distance_to_mrt_meters,
        house.distance_to_cbd,
        house.distance_to_pri_school_meters,
        house.flat_type,
        house.storey_range,
        house.flat_model,
        house.region_ura,
        house.transport_type,
        house.line_color
    ]]
    
    # Make the prediction
    prediction = model.predict(input_data)

    return {"prediction": prediction[0]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
