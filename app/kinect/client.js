let io = require('socket.io-client');

let actions = require('./actions');

let socket = io.connect('http://localhost:8008', {
  'reconnect': true,
  'reconnection delay': 500,
  'forceNew': true
});

let socketConnected = false;
let frameCount = 0;
let attempts = 0;
const MAX_ATTEMPTS = 3;

socket.on('connect', function() {
  // reset attempts if connected, and update flag
  attempts = 0;
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
  if(attempts >= MAX_ATTEMPTS) {
    console.error('socket.io failure. disconnecting.');
    socket.disconnect();
  } else {
    console.error('socket.io reconnect attempt: ', attempts);
    actions.updateSkeletons([]);
    attempts++;
  }
});

socket.on('bodyFrame', function(bodies){
  // update skeletons
  frameCount++;
  actions.updateSkeletons(bodies);
});

module.exports = {
  socket,
  connected: () => socketConnected,
  frameCount: () => frameCount
};
