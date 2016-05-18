"use strict";

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.use(express.static('public'));

http.listen(port, function(){
  console.log(`webserver listening on *:${port}`);
});

let messages = [];

process.on( "SIGHUP", function() {
  console.log(`there are ${messages.length} messages in the history`);
});

process.on( "SIGINT", function() {
  console.log(`stopping after ${messages.length}`);
  process.exit();
});


io.on('connection', function(socket){
  // a new user connected:
  // replay old messages to the new user
  for ( let msg of messages ) {
    socket.emit('chat message', msg);
  }

  // store and echo back messages
  socket.on('chat message', function(data){
    let msg = data.msg;
    messages.push( msg );
    // console.log(`got '${msg}' from ${socket.id}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
});

// export app so we can test it
exports = module.exports = app;
