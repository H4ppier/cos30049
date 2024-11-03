import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score
import joblib
import pickle

file_path = '../data/merged_singapore_house_prices.csv'

df = pd.read_csv(file_path)

# Prepare data for training
X = df.drop('resale_price', axis=1)
y = df['resale_price']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save the test dataset
X_test.to_csv('X_test.csv', index=False)
y_test.to_csv('y_test.csv', index=False)

# Initialize and train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

with open('linear_regression_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error: {mse}")
print(f"R^2 Score: {r2}")

# Plot the predicted vs. actual values
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)
plt.title('Predicted vs Actual Resale Prices')
plt.xlabel('Actual Resale Price')
plt.ylabel('Predicted Resale Price')
plt.show()

# Train Polynomial Regression Model
degree = 2
model_poly = make_pipeline(PolynomialFeatures(degree=degree), LinearRegression())
model_poly.fit(X_train, y_train)
y_pred_poly = model_poly.predict(X_test)

mse_poly = mean_squared_error(y_test, y_pred_poly)
r2_poly = r2_score(y_test, y_pred_poly)
print(f"Polynomial Regression Mean Squared Error: {mse_poly}")
print(f"Polynomial Regression R^2 Score: {r2_poly}")

plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred_poly, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)
plt.title('Polynomial Regression: Predicted vs Actual Resale Prices')
plt.xlabel('Actual Resale Price')
plt.ylabel('Predicted Resale Price')
plt.show()

# Gradient Boosting Regressor
gbm_model = GradientBoostingRegressor(random_state=42)
gbm_model.fit(X_train, y_train)
y_pred_gbm = gbm_model.predict(X_test)

mse_gbm = mean_squared_error(y_test, y_pred_gbm)
r2_gbm = r2_score(y_test, y_pred_gbm)
print(f"Gradient Boosting Mean Squared Error: {mse_gbm}")
print(f"Gradient Boosting R^2 Score: {r2_gbm}")

# Scatter plot: Predicted vs Actual (Gradient Boosting)
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred_gbm, alpha=0.5, color='blue')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)  # Plot the perfect fit line
plt.title('Predicted vs Actual Resale Prices (Gradient Boosting)')
plt.xlabel('Actual Resale Price')
plt.ylabel('Predicted Resale Price')
plt.show()

# K-Means Clustering
kmeans = KMeans(n_clusters=4, random_state=42)

# Fit the K-Means algorithm to the dataset (excluding 'resale_price')
X_clustering = df.drop('resale_price', axis=1)
kmeans.fit(X_clustering)

# Add the cluster labels to the original dataframe
df['Cluster'] = kmeans.labels_

# Analyze clusters
print(df['Cluster'].value_counts())

# Visualize the clusters using PCA (reduce to 2 dimensions for visualization)
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_clustering)

silhouette_avg = silhouette_score(X_clustering, kmeans.labels_)
print(f"Silhouette Score: {silhouette_avg}")

plt.figure(figsize=(10, 6))
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['Cluster'], cmap='viridis', alpha=0.5)
plt.title('K-Means Clustering Visualization with PCA')
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.colorbar(label='Cluster')
plt.show()

# Prepare the dataset by removing the target column 'resale_price' (since DBSCAN is unsupervised)
X_clustering = df.drop('resale_price', axis=1)

# Apply DBSCAN with chosen eps and min_samples
dbscan = DBSCAN(eps=0.5, min_samples=5) 
dbscan.fit(X_clustering)

# Add the cluster labels to the original dataframe
df['DBSCAN_Cluster'] = dbscan.labels_

# Check how many clusters were formed
print(df['DBSCAN_Cluster'].value_counts())

# Analyze the number of noise points (labeled as -1 by DBSCAN)
noise_points = df[df['DBSCAN_Cluster'] == -1]
print(f"Number of noise points detected by DBSCAN: {len(noise_points)}")

# Visualize the clusters using PCA (reduce dimensions for 2D visualization)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_clustering)

# Plot the clusters (including noise labeled as -1)
plt.figure(figsize=(10, 6))
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['DBSCAN_Cluster'], cmap='viridis', alpha=0.5)
plt.title('DBSCAN Clustering Visualization with PCA')
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.colorbar(label='Cluster')
plt.show()