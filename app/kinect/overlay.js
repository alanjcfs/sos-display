let Pixi = require('pixi.js');
let _ = require('underscore');

let input = require('./input');
let kinectActions = require('./actions');

let { SkeletalBody, SHAPESXOFFSET, SHAPESYOFFSET } = require('./skeletalbody');
let { Timer } = require('../util');

const TRACKINGID_PREFIX = 'skel-';

let timer = new Timer();
setInterval(function() {
  kinectActions.updateKinectFPS(timer.fps());
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
  addSkeleton: function(bodyId) {
    let skeleton = new SkeletalBody();
    let color = Math.random() * 0x1000000;
    skeleton.init(color);
    this.skeletons[TRACKINGID_PREFIX + bodyId] = skeleton;
  },
  removeSkeleton: function(bodyId) {
    let skel = this.getSkeleton(bodyId);
    skel.remove();
    delete this.skeletons[TRACKINGID_PREFIX + bodyId];
  },
  updateSkeletonBodyData: function(bodyId, bodyData) {
    if(_.has(this.skeletons, TRACKINGID_PREFIX + bodyId)) {
      this.skeletons[TRACKINGID_PREFIX + bodyId].setBodyData(bodyData);
    }
  },
  start: function(renderer) {

    let draw = (now) => {
      timer.tick(now);
      _.each(this.skeletons, (skel) => {
        skel.drawToStage(this.container);
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

kinectActions.actorLeft.listen(function(ids) {
  _.each(ids, (bodyId) => {
    Overlay.removeSkeleton(bodyId);
  });
});

kinectActions.actorEntered.listen(function(ids) {
  _.each(ids, (bodyId) => {
   Overlay.addSkeleton(bodyId);
  });
});

// process all the raw kinect data and turn them into skeleton bodies
// we can work with.
kinectActions.updateSkeletons.listen(function(bodies) {

  _.each(bodies, function(body) {
    Overlay.updateSkeletonBodyData(body.trackingId, body);
  });

  let hands = _.map(Overlay.skeletons, function(skel) {
    let hand = skel.getHandPointerPoint();
    return {
      x: hand.x + SHAPESXOFFSET,
      y: hand.y + SHAPESYOFFSET
    };
  });

  input.processHands(hands);
});

module.exports = Overlay;
