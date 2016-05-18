"use strict";

const v8 = require('v8');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port    = process.env.PORT || ( process.env.NODE_ENV == 'test' ? 5555 : 5500 );

app.use(express.static('public'));

http.listen(port, function(){
  console.log(`webserver listening on *:${port}`);
});

let messages = [];

function log_status() {
  let used_heap_size = v8.getHeapStatistics()['used_heap_size'];
  used_heap_size = Math.floor( used_heap_size / 1024 ); // kb
  used_heap_size = Math.floor( used_heap_size / 1024 ); // mb
  console.log(`${messages.length} chat messages from ${io.engine.clientsCount} clients for a used heap size of ${used_heap_size} MB`);
}

process.on( "SIGHUP", log_status );
process.on( "SIGINT", function() {
  log_status();
  process.exit();
});

setInterval( log_status, 1000 * 2 );

io.on('connection', function(socket){
  // a new user connected:
  // replay old messages to the new user
  for ( let msg of messages ) {
    socket.emit('chat message', msg);
  }

  // store and echo back messages
  socket.on('chat message', function(msg){
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
