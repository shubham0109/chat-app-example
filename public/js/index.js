var socket = io();

socket.on('connect', function() { 
    console.log("connected");
});

socket.on('disconnect', function() {
    console.log("disconnected");
});



socket.on('newMsg', function(data) {
    console.log(data);
    var time = moment(data.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${data.from} ${time} : ${data.text}`);
    $('#messages').append(li);
});

$('document').ready(function(){

    $('form').submit(function(e){
        e.preventDefault();
        socket.emit('createMsg', {
            from : "User",
            text : $('input').val()
        }, function(){
            $('input').val('');
        });
    });
});


