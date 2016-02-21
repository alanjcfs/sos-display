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

  addSkeleton: function(bodyData) {
    let { trackingId: bodyId, color } = bodyData;
    let id = TRACKINGID_PREFIX + bodyId;
    let skeleton = new SkeletalBody(color);
    this.skeletons[id] = skeleton;
  },

  updateSkeleton: function(bodyData) {
    let { trackingId: bodyId } = bodyData;
    let id = TRACKINGID_PREFIX + bodyId;
    if(_.has(this.skeletons, id)) {
      this.skeletons[id].setBodyData(bodyData);
    }
  },

  removeSkeleton: function(bodyId) {
    let id = TRACKINGID_PREFIX + bodyId;
    this.skeletons[id].remove();
    delete this.skeletons[id];
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

kinectActions.actorEntered.listen(function(bodies) {
  _.each(bodies, Overlay.addSkeleton.bind(Overlay));
});

kinectActions.updateSkeletons.listen(function(bodies) {
  _.each(bodies, Overlay.updateSkeleton.bind(Overlay));
});

kinectActions.actorLeft.listen(function(ids) {
  _.each(ids, Overlay.removeSkeleton.bind(Overlay));
});

module.exports = Overlay;
