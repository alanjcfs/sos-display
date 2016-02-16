let Pixi = require('pixi.js');

let Mode = require('./mode').Mode;

let image = new Mode('image', 'Sample Image');

// load texture once, on load.
let texture = Pixi.Texture.fromImage('static/images/winter-is-coming.jpg');
let sprite = new Pixi.Sprite(texture);
sprite.width = 192 / sprite.width;
sprite.height = 320 / sprite.height;
image.container.addChild(sprite);

module.exports = image;
