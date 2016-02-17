let io = require('socket.io-client');

let actions = require('./actions');

let ATTEMPTS = 0;
let MAX_ATTEMPTS = 3;

let socket = io.connect('http://localhost:8008', {
  'reconnect': true,
  'reconnection delay': 500,
  'forceNew': true
});

let socketConnected = false;
let frameCount = 0;

socket.on('connect', function() {
  // reset attempts if connected, and update flag
  ATTEMPTS = 0;
  socketConnected = true;
});

socket.on('error', (err) => {
  console.error('socket.io error:', err);
  actions.updateSkeletons([]);
});

socket.on('disconnect', (disc) => {
  socketConnected = false;
  console.error('socket.io disconnect:', disc);
  actions.updateSkeletons([]);
});

socket.on('reconnect_attempt', () => {
  if(ATTEMPTS >= MAX_ATTEMPTS) {
    console.error('socket.io failure. disconnecting.');
    socket.disconnect();
  } else {
    console.error('socket.io reconnect attempt: ', ATTEMPTS);
    actions.updateSkeletons([]);
    ATTEMPTS++;
  }
});

socket.on('bodyFrame', function(bodies){

  // update skeletons
  frameCount++;
  actions.updateSkeletons(bodies);

  // we need to send a refresh because socket.io might not flush?
  // TODO: eliminate the need for this.
  socket.emit('refresh', 'callback hell', function(data) {
    // no-op.
    data = null;
  });
});

module.exports = {
  socket: socket,
  connected: function() {
    return socketConnected;
  },
  frameCount: function() {
    return frameCount;
  }
};
