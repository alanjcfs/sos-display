let Reflux = require('reflux');
let _ = require('underscore');

let actions = require('./actions');

module.exports = Reflux.createStore({
  listenables: actions,

  onUpdateSkeletons: function(skeletons) {
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
      kinectFPSHistory: _(200).times(function() { return 0.0; }),
      skeletons: [],
      hands: []
    };
    return this.data;
  }
});
