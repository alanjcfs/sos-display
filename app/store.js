'use strict';

let Reflux = require('reflux');
let keyboard = require('keyboardjs');

let actions = require('./actions');

module.exports = Reflux.createStore({
  listenables: actions,

  init: function() {
    keyboard.bind('w', (e) => {
      this.data.control.offsets.y++;
      this.trigger(this.data);
    });
    keyboard.bind('s', (e) => {
      this.data.control.offsets.y--;
      this.trigger(this.data);
    });
    keyboard.bind('a', (e) => {
      this.data.control.offsets.x--;
      this.trigger(this.data);
    });
    keyboard.bind('d', (e) => {
      this.data.control.offsets.x++;
      this.trigger(this.data);
    });
    keyboard.bind('n', (e) => {

    });
    keyboard.bind('p', (e) => {

    });
    keyboard.bind('r', (e) => {
      if(!e.metaKey && !e.controlKey) {
        this.data.control.development = !this.data.control.development;
        this.trigger(this.data);
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
