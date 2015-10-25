'use strict';

let io = require('socket.io-client');

let actions = require('../actions');

let skeletons = {};

let socket = io.connect('http://localhost:8008', {
  'reconnect': true,
  'reconnection delay': 500,
  'forceNew': true
});

socket.on('error', (err) => {
  console.error("socket.io error:", err);
  actions.updateSkeletons([]);
});

socket.on('disconnect', (disc) => {
  console.error("socket.io disconnect:", disc);
  actions.updateSkeletons([]);
});

socket.on('reconnect_attempt', (attempt) => {
  console.error("socket.io reconnect attempt");
  actions.updateSkeletons([]);
});

socket.on('bodyFrame', function(bodies){
  actions.updateSkeletons(bodies);

  // we need to send a refresh because socket.io might not flush?
  // TODO: eliminate the need for this.
  socket.emit("refresh", "callback hell", function(data) {
    // no-op.
    data = null;
  });
});
