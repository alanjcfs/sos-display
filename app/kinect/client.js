'use strict';

let io = require('socket.io-client');
let _ = require('underscore');

let SkeletalBody = require('./skeletalbody').SkeletalBody;
let actions = require('../actions');

let XOFFSET = require('./skeletalbody').SHAPESXOFFSET;
let YOFFSET = require('./skeletalbody').SHAPESYOFFSET;
let TRACKINGID_PREFIX = "skel-";

let skeletons = {};

let socket = io.connect('http://localhost:8008', {
  'reconnect': true,
  'reconnection delay': 500,
  'forceNew': true
});

socket.on('error', (err) => {
  console.error("socket.io error:", err);
});

socket.on('disconnect', (disc) => {
  console.error("socket.io disconnect:", disc);
});

socket.on('reconnect_attempt', (attempt) => {
  console.error("socket.io reconnect attempt");
});

socket.on('bodyFrame', function(bodies){

  // sweep all tracked skeletons to mark as false (for eventual removal)
  _.each(skeletons, function(skeleton) {
    skeleton.setActiveStatus(false);
  });

  _.each(bodies, function(body) {
    let id = TRACKINGID_PREFIX + body.id;
    let skeleton = skeletons[id];

    // if skeleton exists, just set active status to true and
    // update the data payload
    if(skeleton) {
      skeletons[id].setActiveStatus(true);
      skeletons[id].setBodyData(body);
    } else {
      skeleton = new SkeletalBody();
      skeletons[id] = skeleton;
      skeleton.setBodyData(body);

      actions.newSkeleton(skeleton);
    }
  });

  actions.updateSkeletons(bodies);

  let hands = _.map(skeletons, function(skel, key) {
    let hand = skel.getHandPointerPoint();
    return {
      x: hand.x + XOFFSET,
      y: hand.y + YOFFSET
    };
  });
  actions.updateHands(hands);

  // we need to send a refresh because socket.io might not flush?
  // TODO: eliminate the need for this.
  socket.emit("refresh", "callback hell", function(data) {
    // no-op.
    data = null;
  });
});
