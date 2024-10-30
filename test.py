import joblib

try:
    model = joblib.load("linear_regression_model.pkl")
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)