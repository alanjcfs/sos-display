let Reflux = require('reflux');
let _ = require('underscore');

let kinectActions = require('./actions');

module.exports = Reflux.createStore({
  listenables: kinectActions,

  setColors: function(skeletons) {
    _.each(skeletons, (skeleton) => {
      let id = skeleton.trackingId;
      if (!this.data.skeletonColors[id]) {
        let color = Math.random() * 0x1000000;
        this.data.skeletonColors[id] = color;
      }
      skeleton.color = this.data.skeletonColors[id];
    });
  },

  onUpdateSkeletons: function(skeletons) {

    this.setColors(skeletons);

    let updated = _.pluck(skeletons, 'trackingId');

    let left = _.difference(this.data.trackingIds, updated);
    if(left.length > 0) {
      kinectActions.actorLeft(left);
    }

    let entered = _.difference(updated, this.data.trackingIds);
    if(entered.length > 0) {
      let bodies = _.filter(skeletons, ({ trackingId }) => _.contains(entered, trackingId));
      kinectActions.actorEntered(bodies);
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
      skeletonColors: {},
      trackingIds: []
    };
    return this.data;
  }
});
