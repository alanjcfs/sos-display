'use strict';

let Reflux = require('reflux');

module.exports = Reflux.createActions([
  // configuration
  "setProductionMode",
  "adjustOffset",

  // modes
  "setMode",
  "resetMode",
  "previousMode",
  "nextMode",
  "randomMode",
  "toggleModeJumps",
  "updateModeInformation",

  // kinect
  "toggleKinect",
  "updateSkeletons",
  "updateHands"
]);
