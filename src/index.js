const express = require('express');
const app = require("./app");
const path = require('path');
const http = require('http');
const Users = require('./utils/users');
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const appFolder = path.join(__dirname, "public");

app.use(express.static(appFolder));


io.on('connection', (socket) => {
    console.log("New WebSocket connection");

    //socket.emit -> Sends to a specific client
    //io.emit -> all connected clients
    //socket.broadcast.emit -> Sends to everyone except the person who sent it.
    //io.to.emit -> Emits to everyone in a room.
    //socket.broadcast.to.emit -> Emits to a room except the client.

    socket.on('join', ({ username, room }, callback) => {
        const user = Users.addUser({
            id: socket.id, 
            name: username,
            room
        });
        if (user == null) {
            return callback();
        }
        socket.join(user.room);
        socket.emit("message", "Welcome !");
        socket.broadcast.to(user.room).emit("message", `${user.name} has joined!`);
        callback(user);
    });
    
    socket.on("sendMessage", (message, callback) => {
        const user = Users.getUser(socket.id);
        if (user == null) {
            return callback();
        }
        io.to(user.room).emit("message", message);
        callback();
    });

    socket.on("sendLocation", (location, callback) => {
        const user = Users.getUser(socket.id);
        if (user == null) {
            return callback();
        }
        socket.broadcast.to(user.room).emit("locationMessage", `location: ${location.latitude}, ${location.longitude}`);
        callback();
    });

    socket.on("disconnect", () => {
        const userDeleted = Users.removeUser(socket.id);
        if (userDeleted == null) {
            return ;
        }
        io.to(userDeleted.room).emit("message", `${userDeleted.name} has left!`);
    });

});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

