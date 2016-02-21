let actions = require('../actions');
let kinectActions = require('../kinect/actions');

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
    if(hands.length !== 0) {
      hands[0].x = mouse.x;
      hands[0].y = mouse.y;
    } else {
      hands = [mouse];
    }
  }

  kinectActions.updateHands(hands);
};

module.exports = {
  processHands
};
