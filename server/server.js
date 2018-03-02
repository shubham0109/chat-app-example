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

    
    socket.emit('newMsg', {
        from : 'Admin',
        text : 'welcome to the chat'
    });

    socket.broadcast.emit('newMsg', {
        from : 'Admin',
        text : 'New user joined.'
    }); 

    socket.on('disconnect', () => {
        console.log("disconnected");
    })

    socket.on('createMsg', (data) => {
    //    console.log(data);

        io.emit('newMsg', {
            from : data.from,
            text : data.text,
            createdAt : 123
        });
    });

    
});

app.use(express.static(path.join(__dirname, '../public')));

