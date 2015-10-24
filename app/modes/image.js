'use strict';

let Mode = require('./mode').Mode;

let Pixi = require('pixi.js');

let image = new Mode("image", "Sample Image");

image.start = function(renderer) {
  let texture = Pixi.Texture.fromImage('static/images/winter-is-coming.jpg');
  let image = new Pixi.Sprite(texture);
  let container = new Pixi.Container();

  console.log(renderer);

  container.addChild(image);

  var render = () => {
    renderer.render(container);
    requestAnimationFrame(render);
  };

  this.renderID = requestAnimationFrame(render);
};

image.stop = function() {
  cancelAnimationFrame(this.renderID);
};

module.exports = image;
