#!/usr/bin/env node
// import express from 'express';
const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const db = require('./configs/db')


db();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api/user', userRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));