'use strict';

let _ = require('underscore');

let actions = require('../actions');

// if we are in development mode, use the mouse as a substitution for
// the hands of the first kinect skeleton.

let mouse = { x: 0, y: 0 };
let mousemove = false;
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

actions.setProductionMode.listen(function(on) {
  mousemove = on;
  if(mousemove) {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
  } else {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
  }
});

let processHands = function(hands) {
  if (mousemove) {
    hands[0].x = mouse.x;
    hands[0].y = mouse.y;
  }

  actions.updateHands(hands);
};

module.exports = {
  processHands: processHands
};
