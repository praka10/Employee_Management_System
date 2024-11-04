const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employees');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL =  'mongodb://localhost:27017/employeeDB';

app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('strictQuery', false);
