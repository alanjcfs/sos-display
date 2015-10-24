'use strict';

let Mode = require('../mode');

let Pixi = require('pixi.js').PIXI;

var mode = angular.module('sos.modes');
mode.factory('modeSampleImage', function($log) {

  var mode = new Mode("modeSampleImage", "Sample Image");

  mode.init = function(parentScope) {

    this.setParentScope(parentScope);
    this.container = new Pixi.Container();

    // create a texture from an image path
    var texture = Pixi.Texture.fromImage('media/winter-is-coming.JPEG');
    // create a new Sprite using the texture
    var image = new Pixi.Sprite(texture);

    this.container.addChild(image);
    this.renderID = requestAnimationFrame(this.update);
  };

  mode.update = function() {
    mode.parentScope.pixijs.renderer.render(mode.container);
    requestAnimationFrame(mode.update);
  };

  mode.deinit = function() {
    cancelAnimationFrame(this.renderID);
  };

  return mode;
});
