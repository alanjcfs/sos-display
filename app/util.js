'use strict';

function Timer () {
  this.elapsed = 0;
  this.last = null;
}

Timer.prototype = {
  tick: function (now) {
    this.elapsed = (now - (this.last || now)) / 1000;
    this.last = now;
  },
  fps: function () {
    // invert seconds per frame to get fps
    return Math.round(1.0 / this.elapsed);
  }
};

module.exports = {
  Timer: Timer
};
