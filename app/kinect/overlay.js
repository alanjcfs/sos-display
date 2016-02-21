let Pixi = require('pixi.js');
let _ = require('underscore');

let kinectActions = require('./actions');

let { SkeletalBody } = require('./body');
let { TRACKINGID_PREFIX } = require('./constants');
let { Timer } = require('../util');

let timer = new Timer();
setInterval(function() {
  kinectActions.updateKinectFPS(timer.fps());
}, 200);

// wrapper to draw the current skeleton bodies.
let Overlay = {
  container: new Pixi.Container(),
  skeletons: {},

  skeletonsCount: function() {
    return _.size(this.skeletons);
  },

  getSkeleton: function(bodyId) {
    let id = TRACKINGID_PREFIX + bodyId;
    return this.skeletons[id];
  },

  addSkeleton: function(bodyId) {
    let id = TRACKINGID_PREFIX + bodyId;
    let color = Math.random() * 0x1000000;
    let skeleton = new SkeletalBody(color);
    this.skeletons[id] = skeleton;
  },

  removeSkeleton: function(bodyId) {
    let id = TRACKINGID_PREFIX + bodyId;
    this.getSkeleton(bodyId).remove();
    delete this.skeletons[id];
  },

  updateSkeletonBodyData: function(bodyId, bodyData) {
    let id = TRACKINGID_PREFIX + bodyId;
    if(_.has(this.skeletons, id)) {
      this.skeletons[id].setBodyData(bodyData);
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

kinectActions.updateSkeletons.listen(function(bodies) {
  _.each(bodies, function(body) {
    Overlay.updateSkeletonBodyData(body.trackingId, body);
  });
});

module.exports = Overlay;
