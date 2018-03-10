var socket = io();

function scrollToBottom (){
    var message = $('#messages');
    var newMessage = message.children('li:last-child');

    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight){
        message.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() { 
    console.log("connected");
});

socket.on('disconnect', function() {
    console.log("disconnected");
});



socket.on('newMsg', function(data) {
    console.log(data);
    var time = moment(data.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var rendered = Mustache.render(template, {
        from : data.from,
        text : data.text,
        createdAt : time
    });
    $('#messages').append(rendered);
    scrollToBottom();
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


