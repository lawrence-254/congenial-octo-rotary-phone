#!/usr/bin/env node
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');
dotenv.config();

const db = require('./configs/db');

// Establish database connection
db();

const app = express();
app.use(express.json()); cors
//configuring cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Mount user routes under '/api/user'
app.use('/api/user', userRoutes);
// chat route
app.use('/api/chat', require('./routes/chatRoutes'));
//message routes
app.use('/api/message', require('./routes/messageRoutes'));
// Middleware to handle 404 Not Found errors
app.use(notFound);

// Middleware to handle all other errors
app.use(errorHandler);

// Define port to run server
const PORT = process.env.PORT;
// Start the server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('setup', (userCredentials) => {
        socket.join(userCredentials._id);
        console.log(userCredentials._id);
        socket.emit('connected');
    });
    socket.on('join chatSpace', (chatSpace) => {
        socket.join(chatSpace);
        console.log('joined chatSpace' + chatSpace);
    });
    socket.on('typing', (chatSpace) => {
        socket.in(chatSpace).emit('typing');
    });
    socket.on('not typing', (chatSpace) => {
        socket.in(chatSpace).emit('not typing');
    });
    socket.on('new message', (newlyRecievedMessage) => {
        var space = newlyRecievedMessage.chat;

        if (!chat.chatParticipants) return console.log('No chat partner found');
        chat.chatParticipants.forEach(user => {
            if (user._id == newlyRecievedMessage.sender._id) return;
            socket.in(user._id).emit('message received', newlyRecievedMessage);
        });

    })
    socket.off('setup', (userCredentials) => {
        socket.leave(userCredentials._id);
        console.log(userCredentials._id);
        socket.emit('disconnected');
    });
});
