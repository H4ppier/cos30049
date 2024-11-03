Please install all the nessassary modules using the command below

Front end:
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios chart.js react-chartjs-2 chartjs-plugin-zoom

Back end:
pip install fastapi uvicorn sqlalchemy python-jose mysqlclient

For databse, MYSQL workbench was used to store the user information and the prediction history.
To install MYSQL workbench:
1) Go to https://dev.mysql.com/downloads/workbench/ and download for Microsoft Windows
3) Run the installer
4) Follow the recommanded setup 
5) Then launch the MYSQL workbench
6) Once in the home page, you will see Local instance MySQL80.
7) Double-click on it and a pop up will ask you to enter the password you enter just now
8) You will be connected to the databse
9) In main.py, change DATABASE_URL to your url to your database