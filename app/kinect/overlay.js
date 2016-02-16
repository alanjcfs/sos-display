let Pixi = require('pixi.js');
let _ = require('underscore');

let SkeletalBody = require('./skeletalbody').SkeletalBody;
let input = require('./input');
let Timer = require('../util').Timer;
let actions = require('../actions');

let XOFFSET = require('./skeletalbody').SHAPESXOFFSET;
let YOFFSET = require('./skeletalbody').SHAPESYOFFSET;
let TRACKINGID_PREFIX = 'skel-';

let timer = new Timer();
setInterval(function() {
  actions.updateKinectFPS(timer.fps());
}, 500);

// wrapper to draw the current skeleton bodies.
let Overlay = {
  container: new Pixi.Container(),
  skeletons: {},
  skeletonsCount: function() {
    return _.size(this.skeletons);
  },
  getSkeleton: function(bodyId) {
    let skel = this.skeletons[TRACKINGID_PREFIX + bodyId];
    return skel;
  },
  start: function(renderer) {

    let draw = (now) => {
      timer.tick(now);
      _.each(this.skeletons, (skel, key) => {
        if(skel.getActiveStatus()) {
          skel.drawToStage(this.container);
        } else {
          skel.remove();
          delete skel[key];
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

// process all the raw kinect data and turn them into skeleton bodies
// we can work with.
actions.updateSkeletons.listen(function(bodies) {

  // sweep all tracked skeletons to mark as false (for eventual removal)
  _.each(Overlay.skeletons, function(skeleton) {
    skeleton.setActiveStatus(false);
  });

  _.each(bodies, function(body) {
    let id = TRACKINGID_PREFIX + body.trackingId;
    let skeleton = Overlay.skeletons[id];

    // if skeleton exists, just set active status to true and
    // update the data payload
    if(skeleton) {
      Overlay.skeletons[id].setActiveStatus(true);
      Overlay.skeletons[id].setBodyData(body);
    } else {
      skeleton = new SkeletalBody();
      Overlay.skeletons[id] = skeleton;

      let color = Math.random() * 0x1000000;
      skeleton.init(color);
      skeleton.setBodyData(body);
    }
  });

  let hands = _.map(Overlay.skeletons, function(skel) {
    let hand = skel.getHandPointerPoint();
    return {
      x: hand.x + XOFFSET,
      y: hand.y + YOFFSET
    };
  });

  input.processHands(hands);
});

module.exports = Overlay;
