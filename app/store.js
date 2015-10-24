'use strict';

let Reflux = require('reflux');
let keyboard = require('keyboardjs');
let _ = require('underscore');

let actions = require('./actions');
let modes = require('./modes');

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
      let index = (this.data.modes.index + 1) % this.data.modes.list.length;
      let next = this.data.modes.list[index];
      actions.setMode(this.data.modes.current, next);
    });
    keyboard.bind('p', (e) => {
      let index = (this.data.modes.index === 0) ? this.data.modes.list.length - 1 : this.data.modes.index - 1;
      let prev = this.data.modes.list[index];
      actions.setMode(this.data.modes.current, prev);
    });
    keyboard.bind('x', (e) => {
      this.data.control.development = !this.data.control.development;
      this.trigger(this.data);
    });
  },

  onSetMode: function(old, chosen) {
    this.data.modes.current = chosen;
    this.data.modes.index = _.indexOf(this.data.modes.list, chosen);
    this.trigger(this.data);
  },

  onResetMode: function() {
    let current = this.data.modes.current;
    this.onSetMode(current, current);
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
    let index = 0;
    this.data = {
      control: {
        development: true,
        offsets: { x: 0, y: 15 }
      },
      modes: {
        index: index,
        current: modes[index],
        list: modes
      }
    };
    return this.data;
  }
});
