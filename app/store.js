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

  onSetMode: function(id) {
    let chosen = _.find(this.data.modes.list, function(mode) {
      return mode.id === id;
    });
    if (chosen) {
      this.data.modes.current = chosen;
      this.trigger(this.data);
    }
  },

  onResetMode: function() {
    this.data.modes.current.stop();
    this.data.modes.current.start();
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
      control: {
        development: true,
        offsets: { x: 0, y: 15 }
      },
      modes: {
        current: modes[0],
        list: modes
      }
    };
    return this.data;
  }
});
