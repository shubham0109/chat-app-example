const path = require('path');
const express = require('express');
var app = express();
const socketIO = require('socket.io');
var generateMessage = require('./utils/message');

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log(`server listening at ${port}`);
});
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("new user connected");

    
    socket.emit('newMsg', generateMessage('Admin','welcome to the chat'));

    socket.broadcast.emit('newMsg', generateMessage('Admin','New user added')); 

    socket.on('disconnect', () => {
        console.log("disconnected");
    })

    socket.on('createMsg', (data) => {
    //    console.log(data);

        io.emit('newMsg', generateMessage(data.from, data.text));
    });

    
});

app.use(express.static(path.join(__dirname, '../public')));

