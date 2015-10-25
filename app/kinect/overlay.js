'use strict';

let Pixi = require('pixi.js');
let _ = require('underscore');

let SkeletalBody = require('./skeletalbody').SkeletalBody;
let input = require('./input');
let Timer = require('../util').Timer;
let actions = require('../actions');

let XOFFSET = require('./skeletalbody').SHAPESXOFFSET;
let YOFFSET = require('./skeletalbody').SHAPESYOFFSET;
let TRACKINGID_PREFIX = "skel-";

let skeletons = {};

// process all the raw kinect data and turn them into skeleton bodies
// we can work with.
actions.updateSkeletons.listen(function(bodies) {

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

      var color = Math.random() * 0x1000000;
      skeleton.init(color);
      skeleton.setBodyData(body);
    }
  });

  let hands = _.map(skeletons, function(skel, key) {
    let hand = skel.getHandPointerPoint();
    return {
      x: hand.x + XOFFSET,
      y: hand.y + YOFFSET
    };
  });

  input.processHands(hands);
});

let timer = new Timer();
setInterval(function() {
  actions.updateKinectFPS(timer.fps());
}, 1000);

// wrapper to draw the current skeleton bodies.
let Overlay = {
  container: new Pixi.Container(),

  start: function(renderer) {

    let draw = (now) => {
      timer.tick(now);
      _.each(skeletons, (skeleton, key) => {
        if(skeleton.getActiveStatus()) {
          skeleton.drawToStage(this.container);
        } else {
          skeleton.remove();
          delete skeletons[key];
        }
      });

      renderer.render(this.container);
      this.renderID = requestAnimationFrame(draw);
    };

    this.renderID = requestAnimationFrame(draw);
  },

  stop: function(renderer) {
    this.container.removeChildren();
    cancelAnimationFrame(this.renderID);
    // clear out the last frame.
    requestAnimationFrame(() => { renderer.render(this.container); });
  }
};

module.exports = Overlay;
