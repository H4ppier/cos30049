from fastapi.security import OAuth2PasswordBearer
import pickle
import pandas as pd
import os
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException, status, Query
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List


# Database Configuration
DATABASE_URL = "mysql://root:Nick*2004@localhost:3306"
DATABASE_NAME = "user"

# Initial engine for database creation
initial_engine = create_engine(DATABASE_URL)
Base = declarative_base()

# Create the database if it doesn’t exist
def create_database():
    with initial_engine.connect() as connection:
        connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}"))
    connection.close()

create_database()  # Ensure the database is created before proceeding

# Reconfigure the engine to use the newly created database
engine = create_engine(f"{DATABASE_URL}/{DATABASE_NAME}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# JWT Configuration
SECRET_KEY = "your_secret_key"  # Replace with a secure, unique key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL of your React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50, collation='utf8_bin'), unique=True, index=True)  # Case-sensitive
    email = Column(String(100, collation='utf8_bin'), unique=True, index=True)  # Case-sensitive
    password = Column(String(100))

# Create the database tables if they don’t exist
Base.metadata.create_all(bind=engine, checkfirst=True)  # Ensures tables are created only if they don’t exist

# Pydantic Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Utility function to create access token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# CRUD functions
def create_user(db: Session, username: str, email: str, password: str):
    db_user = User(username=username, email=email, password=password)  # Store password directly
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# def authenticate_user(db: Session, username: str, password: str):
#     user = db.query(User).filter(User.username == username).first()
#     if user and user.password == password:  # Compare password directly
#         return user
#     return None

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and user.username == username and user.password == password:  # Explicitly check username case
        return user
    return None

# API Routes
@app.post("/signup", response_model=dict)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    create_user(db, user.username, user.email, user.password)
    return {"msg": "User created successfully"}

@app.post("/login", response_model=dict)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

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

    return scaled_df[['floor_area_sqft', 'predicted_price', 'remaining_lease_months', 'price_per_sqft', 'distance_to_mrt_meters', 'distance_to_cbd', 'distance_to_pri_school_meters']]  # Columns for scatter plot and bar chart


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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Function to get the current user from the token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Profile endpoint to get user details
@app.get("/profile")
def get_profile(user: User = Depends(get_current_user)):
    return {"username": user.username, "email": user.email}

# Profile endpoint to update user details
class UserUpdate(BaseModel):
    username: str
    email: str

@app.put("/profile")
def update_profile(updated_user: UserUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Check if the new username or email is already taken by another user
    if updated_user.username != user.username:
        existing_user = db.query(User).filter(User.username == updated_user.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username is already taken")

    if updated_user.email != user.email:
        existing_email = db.query(User).filter(User.email == updated_user.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email is already taken")

    # Update user information
    user.username = updated_user.username
    user.email = updated_user.email
    db.commit()  # Commit the changes to the database
    db.refresh(user)  # Refresh the user object with the updated data

    return {"msg": "Profile updated successfully"}

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

@app.get("/flat-model-distribution")
def get_flat_model_distribution(chosen_model: str = Query(None)):
    # Get counts of each flat model based on one-hot encoded columns
    distribution = test_data.filter(like='flat_model_').sum().to_dict()
    
    print("Initial distribution:", distribution)
    print("Chosen model:", chosen_model)

    # If a model is chosen, increment its count for highlighting
    if chosen_model in distribution:
        distribution[chosen_model] += 1  # Increment the count for the chosen model
        print(f"Incremented count for {chosen_model}: {distribution[chosen_model]}")

    return distribution

@app.get("/remaining-lease-distribution")
def get_remaining_lease_distribution(user_lease: int = Query(None)) -> dict:
    # Fetch unscaled test data with unscaled remaining_lease_months
    unscaled_test_data = predict_test_data()
    
    # Calculate the distribution using unscaled remaining lease months
    distribution = unscaled_test_data['remaining_lease_months'].value_counts().sort_index().to_dict()

    # Separate keys and values into two lists
    lease_values = list(distribution.keys())
    frequencies = list(distribution.values())

    # Update distribution with user's input
    if user_lease is not None:
        if user_lease in distribution:
            distribution[user_lease] += 1  # Increment the count
        else:
            distribution[user_lease] = 1  # Add new entry with count 1
        # Sort again to maintain order
        distribution = dict(sorted(distribution.items()))

    # Prepare data for return
    lease_values = list(distribution.keys())
    frequencies = list(distribution.values())

    return {"lease_values": lease_values, "frequencies": frequencies}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)