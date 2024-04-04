#!/usr/bin/env node
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');
const path = require('path');
const db = require('./configs/db');

//=======================================================
dotenv.config();
// Establish database connection
db();
//=======================================================
const app = express();
// Middleware to parse JSON data
app.use(express.json()); cors
//configuring cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));

//===============================================================

// Mount user routes under '/api/user'
app.use('/api/user', userRoutes);
// chat route
app.use('/api/chat', require('./routes/chatRoutes'));
//message routes
app.use('/api/message', require('./routes/messageRoutes'));

//===============================================================


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const __dirname0 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname0, '/client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname0, 'client', 'build', 'index.html'))
    );
} else {
    // Define a simple route for testing
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//===============================================================


// Middleware to handle 404 Not Found errors
app.use(notFound);

// Middleware to handle all other errors
app.use(errorHandler);

//===============================================================

// Define port to run server
const PORT = process.env.PORT || 5000;
//===============================================================
// Start the server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});


// Socket.io

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
        var chat = newlyRecievedMessage.chat;

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

