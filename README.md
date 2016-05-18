## try the demo

https://frozen-waters-32837.herokuapp.com/

## run locally

    npm install

before starting the app with


    node index.js


for testing, you need to also install mocha and should.js

    sudo npm -g install should
    sudo npm -g install should
    npm test


## benchmark

    sudo npm -g install websocket-bench
    websocket-bench -t socket.io -a 200 -c 100 -w 2 -g websocket-bench-generator.js -m 10 ws://localhost:5500

## deploy to heroku

    heroku create
    git push heroku master
    heroku open


## sources

This example inspired by

* http://socket.io/get-started/chat/
* http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
* http://stackoverflow.com/questions/18941736/ensuring-express-app-is-running-before-each-mocha-test#answer-19377023
* https://devcenter.heroku.com/articles/node-websockets
