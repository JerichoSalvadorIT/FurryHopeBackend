const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const animalRoutes = require('./routes/animalRoutes');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');

// Object of the imported package (express)
const app = express();
app.use(express.json());

// Cors - allows requests and access resources from the server from any origin
app.use(cors());

// For the environment variables
dotenv.config();

// For the database connection
connectDB();

// Creating the web server - it listens on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server on port ${PORT}`));

// API Calls - GET
app.get('/', (req, res) => {
    res.send("API IS RUNNING");
});

// Routes for the Admin
// Uses the route for adding admins and loggin in
app.use('/api/admins', adminRoutes);

// Routes for the animals' data
app.use('/api/animals', animalRoutes);

// Routes for the users of the mobile app
app.use('/api/users', userRoutes);

// For error handling within the server
app.use(notFound);
app.use(errorHandler);