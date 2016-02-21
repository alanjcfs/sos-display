let Reflux = require('reflux');
let _ = require('underscore');

let kinectActions = require('./actions');

module.exports = Reflux.createStore({
  listenables: kinectActions,

  onUpdateSkeletons: function(skeletons) {

    let updated = _.pluck(skeletons, 'trackingId');

    let left = _.difference(this.data.trackingIds, updated);
    if(left.length > 0) {
      kinectActions.actorLeft(left);
    }

    let entered = _.difference(updated, this.data.trackingIds);
    if(entered.length > 0) {
      kinectActions.actorEntered(entered);
    }

    this.data.trackingIds = updated;
    this.data.skeletons = skeletons || [];
    this.trigger(this.data);
  },

  onUpdateKinectFPS: function(fps) {
    this.data.kinectFPSHistory.shift();
    this.data.kinectFPSHistory.push(fps);
    this.data.kinectFPS = fps;
    this.trigger(this.data);
  },

  getInitialState: function() {
    this.data = {
      kinectFPS: 0.0,
      kinectFPSHistory: _(200).times(() => 0.0),
      skeletons: [],
      trackingIds: []
    };
    return this.data;
  }
});
