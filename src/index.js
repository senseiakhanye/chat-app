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
    
    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    });
});


server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
