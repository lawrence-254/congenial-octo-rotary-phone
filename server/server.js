#!/usr/bin/env node
// import express from 'express';
const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/chat', (req, res) => {
    res.json(chats);
});

app.get('/api/chat/:id', (req, res) => {
    const chat = chats.find((c) => c._id === req.params.id);
    if (chat) {
        res.json(chat);
    } else {
        res.status(404).json({ message: 'Chat not found' });
    }
});
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));