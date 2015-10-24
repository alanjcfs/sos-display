'use strict';

let Reflux = require('reflux');
let keyboard = require('keyboardjs');
let _ = require('underscore');

let actions = require('./actions');

let shaders = require('./modes/shaders');
let modes = [ shaders.bubbles,
              shaders.caustic,
              shaders.cloudten,
              shaders.disco,
              shaders.echoplex,
              shaders.flame,
              shaders.hell,
              shaders.nyan,
              shaders.ribbon,
              shaders.seascape,
              shaders.stardust,
              shaders.storm,
              shaders.truchet,
              shaders.tunnel,
              shaders.vortex,
              shaders.worms,
            ];

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
      this.data.modes.index++;
      this.data.modes.index %= this.data.modes.list.length;
      this.data.modes.current = this.data.modes.list[this.data.modes.index];
      this.trigger(this.data);
    });
    keyboard.bind('p', (e) => {
      this.data.modes.index = (this.data.modes.index === 0) ? this.data.modes.list.length - 1 : this.data.modes.index - 1;
      this.data.modes.current = this.data.modes.list[this.data.modes.index];
      this.trigger(this.data);
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
