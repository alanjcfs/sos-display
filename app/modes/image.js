'use strict';

let Mode = require('./mode').Mode;

let Pixi = require('pixi.js');

let image = new Mode("image", "Sample Image");
let texture = Pixi.Texture.fromImage('static/images/winter-is-coming.jpg');
let sprite = new Pixi.Sprite(texture);
let container = new Pixi.Container();
sprite.width = 192 / sprite.width;
sprite.height = 320 / sprite.height;

image.start = function(renderer) {

  container.addChild(sprite);

  let render = () => {
    renderer.render(container);
    requestAnimationFrame(render);
  };

  this.renderID = requestAnimationFrame(render);
};

image.stop = function() {
  cancelAnimationFrame(this.renderID);
};

module.exports = image;
