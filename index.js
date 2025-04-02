const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Serve a simple HTML page (optional)
app.get('/', (req, res) => {
    res.send("Hello");
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Send a "hello" message to the client when they connect
    socket.emit('response', { message: 'Hello from Server!' });

    // Handle messages from the client
    socket.on('message', (data) => {
        console.log('Received from client:', data);
        socket.emit('response', { message: 'You said: ' + data.message });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});