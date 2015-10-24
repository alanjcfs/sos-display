'use strict';

let Reflux = require('reflux');
let keyboard = require('keyboardjs');

let actions = require('./actions');

module.exports = Reflux.createStore({
  listenables: actions,

  init: function() {
    let that = this;
    keyboard.bind('w', function(e) {
      that.data.control.offsets.y++;
      that.trigger(that.data);
    });
    keyboard.bind('s', function(e) {
      that.data.control.offsets.y--;
      that.trigger(that.data);
    });
    keyboard.bind('a', function(e) {
      that.data.control.offsets.x--;
      that.trigger(that.data);
    });
    keyboard.bind('d', function(e) {
      that.data.control.offsets.x++;
      that.trigger(that.data);
    });
    keyboard.bind('n', function(e) {

    });
    keyboard.bind('p', function(e) {

    });
    keyboard.bind('r', function(e) {
      if(!e.metaKey && !e.controlKey) {
        that.data.control.development = !that.data.control.development;
        that.trigger(that.data);
      }
    });
  },

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
