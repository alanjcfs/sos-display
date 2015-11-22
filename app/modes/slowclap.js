'use strict';

let Pixi = require('pixi.js');

let Mode = require('./mode').Mode;

let slowclap = new Mode("Slow Clap", "Slow Clap (GIF example)");

// we need to load the spritesheet once so do it on load.
let setupMovie = () => {

  let frames = [];
  for (let i = 0; i < 7; i++) {
    let val = i < 10 ? '0' + i : i;
    frames.push(Pixi.Texture.fromFrame('citizen-kane-clapping_0' + val + '.png'));
  }

  let movie = new Pixi.extras.MovieClip(frames);
  let width = 192 / movie.width;
  let height = 320 / movie.height;
  let scale = new Pixi.Point(width, height);
  movie.position.set(0);
  movie.anchor.set(0);
  movie.scale = scale;
  movie.animationSpeed = 0.5;
  movie.play();

  slowclap.container.addChild(movie);
};

Pixi.loader.add('spritesheet', 'static/images/slow-clap.json').load(setupMovie);

module.exports = slowclap;
