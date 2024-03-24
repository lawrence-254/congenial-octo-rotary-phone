#!/usr/bin/env node
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
dotenv.config();

const db = require('./configs/db');

// Establish database connection
db();

const app = express();
app.use(express.json());

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Mount user routes under '/api/user'
app.use('/api/user', userRoutes);
// chat route
app.use('/api/chat', require('./routes/chatRoutes'));

// Middleware to handle 404 Not Found errors
app.use(notFound);

// Middleware to handle all other errors
app.use(errorHandler);

// Define port to run server
const PORT = process.env.PORT;
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
