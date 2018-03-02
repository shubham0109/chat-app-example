var socket = io();

socket.on('connect', function() { 
    console.log("connected");
});

socket.on('disconnect', function() {
    console.log("disconnected");
});

socket.emit('createMsg', {
    from : 'ken',
    text : "Hello"
});

socket.on('newMsg', function(data) {
    console.log(data);
})

socket.on('welcome', function(data) {
    console.log(data);
});

socket.on('newUserAdded', function(data) {
    console.log(data);
});

socket.emit('newUser');