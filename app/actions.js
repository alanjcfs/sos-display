'use strict';

let Reflux = require('reflux');

module.exports = Reflux.createActions([
  // configuration
  "setProductionMode",
  "adjustOffset",
  "rotateDisplay",

  // modes
  "previousMode",
  "nextMode",
  "randomMode",

  // kinect
  "toggleKinect",
  "newSkeleton",
  "updateSkeleton",
  "updateHands"
]);
