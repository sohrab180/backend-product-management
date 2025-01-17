require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const projectManagement=require('./routes/projectManagement')
const path = require('path');

const api = process.env.API_URL;
const PORT = process.env.PORT;
const DB=  require('./config/dbConnection');
DB()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware to parse JSON
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    optionsSuccessStatus: 200 // For legacy browser support
  }));
  app.use(`${api}/project_management`, projectManagement);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });