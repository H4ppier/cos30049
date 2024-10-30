from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()
# Add CORS middleware
app.add_middleware(
CORSMiddleware,
allow_origins=["http://localhost:3000"], # URL of React application
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)
# Initialize the model
# model = joblib.load("linear_regression_model.pkl")
@app.get("/")
async def root():
    return {"message": "Welcome to the House Price Prediction API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)