
let Reflux = require('reflux');
let actions = require('./actions');

module.exports = Reflux.createStore({
  listenables: actions,
  onSetProductionMode: function(value) {
    this.data.control.development = value;
    this.trigger(this.data);
  },
  onAdjustOffset: function(coord, value) {
    this.data.control.offsets[coord] = value;
    this.trigger(this.data);
  },
  onRotateDisplay: function() {

  },
  getInitialState: function() {
    this.data = {
      mode: 'truchet',
      control: {
        development: true,
        offsets: { x: 0, y: 15 }
      }
    };
    return this.data;
  }
});
