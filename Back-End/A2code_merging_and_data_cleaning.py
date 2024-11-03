import pandas as pd
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
import pickle

file_path1 = '../data/singapore_base.csv'
file_path2 = '../data/cleaned_resale_hdb_price.csv'

# Load the dataset
df1 = pd.read_csv(file_path1)
df2 = pd.read_csv(file_path2)

# Convert 'month' to datetime, then convert it to a Unix timestamp in seconds
df1['month'] = pd.to_datetime(df1['month'], errors='coerce')
df1['month'] = df1['month'].apply(lambda x: x.timestamp() if pd.notnull(x) else None)

# Convert 'month' to datetime, then convert it to a Unix timestamp in seconds
df2['month'] = pd.to_datetime(df2['month'], errors='coerce')
df2['month'] = df2['month'].apply(lambda x: x.timestamp() if pd.notnull(x) else None)

# Function to convert lease to total months
def lease_to_months(lease_str):
    if pd.isnull(lease_str):
        return None
    try:
        parts = lease_str.split()
        years = int(parts[0])  # Extract the number of years
        months = 0  # Default to 0 months if not provided
        if len(parts) > 2:  # If months are present, extract them
            months = int(parts[2])
        total_months = years * 12 + months
        return total_months
    except (IndexError, ValueError) as e:
        print(f"Error processing lease string '{lease_str}': {e}")
        return None
    
# Apply the function to the 'remaining_lease' column
df1['remaining_lease_months'] = df1['remaining_lease'].apply(lease_to_months)
df2['remaining_lease_months'] = df2['remaining_lease'].apply(lease_to_months)

# Merge on month, remaining lease, resale price, latitude and longitude
merged_df = pd.merge(df1, df2, how='inner', 
                     left_on=['month', 'remaining_lease', 'resale_price', 'lat', 'long'], 
                     right_on=['month', 'remaining_lease', 'resale_price', 'latitude', 'longitude'])

# Drop unnecessary columns
df = merged_df.drop(['town', 'addresses', 'searchval', 'floor_area_sqm_x', 'X', 'Y', 'lat', 'long', 'Unnamed: 0', 'blk_no', 'road_name', 'building', 'postal', 'address', 'lease_commence_date_r', 'planning_area_ura', 'x', 'y', 'latitude', 'longitude', 'closest_mrt_station', 'closest_pri_school',  'remaining_lease', 'distanceWithMrt', 'distanceWithRaffles', 'distanceWithGdPri'], axis=1)

# Drop the duplicate columns (i.e., the "_y" columns)
columns_to_drop = ['storey_range_y', 'floor_area_sqm_y', 'flat_model_y', 'lease_commence_date_y', 'lease_commence_date_x', 'remaining_lease_months_y']
df = df.drop(columns=columns_to_drop)

# Rename the "_x" columns to remove the suffix "_x" for clarity
df.columns = df.columns.str.replace('_x', '', regex=False)

# One-hot encode categorical variables
df = pd.get_dummies(df, columns=['flat_type', 'storey_range', 'flat_model', 'region_ura', 'transport_type', 'line_color'])
                 
# Scale numerical features
scaler = StandardScaler()
df[['remaining_lease_months', 'floor_area_sqft', 'price_per_sqft', 'distance_to_mrt_meters', 'distance_to_cbd', 'distance_to_pri_school_meters']] = scaler.fit_transform(df[['remaining_lease_months', 'floor_area_sqft', 'price_per_sqft', 'distance_to_mrt_meters', 'distance_to_cbd', 'distance_to_pri_school_meters']])

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Save the merged DataFrame to a CSV file
output_file_path = '../data/merged_singapore_house_prices.csv'
df.to_csv(output_file_path, index=False)



