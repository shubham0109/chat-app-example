const path = require('path');
const express = require('express');
var app = express();
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log(`server listening at ${port}`);
});
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.on('connect', () => {
        console.log("connected");
    })

    socket.on('disconnect', () => {
        console.log("disconnected");
    })
});

app.use(express.static(path.join(__dirname, '../public')));

