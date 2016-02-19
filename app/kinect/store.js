let Reflux = require('reflux');
let _ = require('underscore');

let actions = require('./actions');

module.exports = Reflux.createStore({
  listenables: actions,

  onUpdateSkeletons: function(skeletons) {

    let updatedTrackingIds = _.pluck(skeletons, 'trackingId');

    // determine who left
    let leftTrackingIds = _.difference(this.data.activeTrackingIds, updatedTrackingIds);
    if(leftTrackingIds.length > 0) {
      actions.actorLeft(leftTrackingIds);
    }

    // determine who entered
    let enteredTrackingIds = _.difference(updatedTrackingIds, this.data.activeTrackingIds);
    if(enteredTrackingIds.length > 0) {
      actions.actorEntered(enteredTrackingIds);
    }

    this.data.activeTrackingIds = updatedTrackingIds;


    this.data.skeletons = skeletons || [];
    this.trigger(this.data);
  },

  onUpdateHands: function(hands) {
    this.data.hands = hands || [];
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
      hands: [],
      activeTrackingIds: []
    };
    return this.data;
  }
});
