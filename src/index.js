const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const appFolder = path.join(__dirname, "public");

app.use(express.static(appFolder));


io.on('connection', (socket) => {
    console.log("New WebSocket connection");

    socket.emit('message', "Welcome!");
    socket.broadcast.emit("message", "A new user has joined!");

    socket.on('join', ({ username, room}) => {
        socket.join(room);

    });

    //socket.emit -> Sends to a specific client
    //io.emit -> all connected clients
    //socket.broadcast.emit -> Sends to everyone except the person who sent it.
    
    
    socket.on("sendMessage", (message, callback) => {
        io.emit("message", message);
        callback();
    });

    socket.on("sendLocation", (location, callback) => {
        socket.broadcast.emit("locationMessage", `location: ${location.latitude}, ${location.longitude}`);
        callback();
    });

    socket.on("disconnect", () => {
        io.emit("message", "A user has left!");
    });

});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

