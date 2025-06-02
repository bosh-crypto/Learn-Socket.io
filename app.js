const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');

// Serve static files from the 'public' directory
app.use(express.static(path.resolve("./public")));

const io = new Server(server);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A New User Has Been Connected', socket.id); // Typo corrected: "Connceted" to "Connected"

    // Optional: Add a simple event listener to confirm communication
    socket.on('helloFromClient', (message) => {
        console.log(`Message from client ${socket.id}: ${message}`);
        socket.emit('helloFromServer', `Server received your message: "${message}"`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

server.listen(9000, () => console.log(`Server started at PORT:9000`));