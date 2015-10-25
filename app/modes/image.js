'use strict';

let Pixi = require('pixi.js');

let Mode = require('./mode').Mode;
let Timer = require('../util').Timer;
let actions = require('../actions');

let image = new Mode("image", "Sample Image");
let texture = Pixi.Texture.fromImage('static/images/winter-is-coming.jpg');
let sprite = new Pixi.Sprite(texture);
let container = new Pixi.Container();
sprite.width = 192 / sprite.width;
sprite.height = 320 / sprite.height;

image.start = function(renderer) {

  container.addChild(sprite);

  let timer = new Timer();
  setInterval(function() {
    actions.updateModeFPS(timer.fps());
  }, 1000);

  let render = (now) => {
    timer.tick(now);
    renderer.render(container);
    actions.updateModeInformation({});
    requestAnimationFrame(render);
  };

  this.renderID = requestAnimationFrame(render);
};

image.stop = function() {
  cancelAnimationFrame(this.renderID);
};

module.exports = image;
