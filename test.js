"use strict"

var should = require('should');
var io = require('socket.io-client');
var app = require('./index');

var socketURL = 'http://0.0.0.0:5000';

var options ={
    transports: ['websocket'],
      'force new connection': true
};

describe("Auction Server",function(){
  it('Should echo chat massages back to user', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){
      client1.emit('chat message', 'hello world 1');
      client1.on('chat message', function(data){
        data.should.equal('hello world 1');
        client1.disconnect();
        done();
      });
    });
  });
  it('Should broadcast old chat massages to new users', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){
      var client2 = io.connect(socketURL, options);

      client2.on('connect', function(data){
        client2.on('chat message', function(data){
          data.should.equal('hello world 1');
          client1.disconnect();
          client2.disconnect();
          done();
        });
      });

    });
  });
  it('Should broadcast chat massages to all users', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){
      var client2 = io.connect(socketURL, options);

      client2.on('connect', function(data){
        client2.emit('chat message', 'hello world 2');
      });

      var messages_expected = ['hello world 1', 'hello world 2'];
      console.log(`        expecting ${messages_expected}`);
      client1.on('chat message', function(data){
        let i = messages_expected.indexOf( data );
        if ( i > -1 ) {
          messages_expected.splice( i,1 );
          console.log(`        got ${data}`);
        } else {
          console.log(`        got unexpected message ${data}`);
          false.should.be.ok();
        }
        if ( messages_expected.length == 0 ) {
          client1.disconnect();
          client2.disconnect();
          console.log(`        got all the messages.`);
          true.should.be.ok();
          done();
        }
      });
    });
  });

});

