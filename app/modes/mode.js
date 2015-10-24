'use strict';

let _ = require('underscore');
let Three = require('three.js');

let vertexShader = require('./shaders/generic.vert.glsl');

var mouse = {};

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.X = event.clientX;
  mouse.Y = event.clientY;
}

let Mode = function(id, title) {
  this.id = id;
  this.title = title;
  this.audio = null;
  this.renderID = null;
  this.rendererType = "PIXI";
  this.kinectEnabled = true;
};

let ShaderMode = function(args) {

  this.id = args.id;
  this.title = args.title;
  this.audio = args.audio;
  this.renderID = null;
  this.rendererType = 'THREE';
  this.kinectEnabled = args.disableKinect ? false : true; // default to true

  this.inputs = _(16).times(function() { return 0.0; });

  this.start = (renderer) => {

    // WebGL will throw a hissyfit if you reuse shaders/patterns from
    // a previous canvas/context, so we need to explicitly re-init.
    this.vertexShader = vertexShader;
    this.fragmentShader = args.fragmentShader;
    this.uniforms = null;

    let uniformExtras = args.uniformExtras || {};

    if (this.audio) {
      this.audio.start();
    }

    /*
    // grab skeletal input
    this.parentScope.$on('kinectInput', function(events, inputs) {
      // override input if we are in dev mode (for easier testing).
      if(this.parentScope.wallDisplayMode === 'DEV') {
        this.inputs[0] = (mouse.X - this.parentScope.urlParamConfig.x) / this.parentScope.canvasDim.width;
        this.inputs[1] = (mouse.Y - this.parentScope.urlParamConfig.y) / this.parentScope.canvasDim.height;
        return;
      }
      // normalize.
      for (var i = 0; i < inputs.length; i++) {
        if ((i % 2) === 0) {
          this.inputs[i] = inputs[i] / parentScope.wallDisplay.width;
          // clamp
          this.inputs[i] = Math.max(this.inputs[i], 0.0);
          this.inputs[i] = Math.min(this.inputs[i], 1.0);
        } else {
          this.inputs[i] = inputs[i] / parentScope.wallDisplay.height;
        }
      }
      for (var j = inputs.length; j < 16; j++) {
        this.inputs[j] = 0.0;
      }
    });
    */

    var camera = new Three.PerspectiveCamera(7, renderer.domElement.width / renderer.domElement.height, 0.1, 100000);
    camera.position.z = 1;

    var scene = new Three.Scene();

    var geometry = new Three.PlaneBufferGeometry(2, 2);

    this.uniforms = {
      input_resolution: {
        type: "v2",
        value: new Three.Vector2(192.0, 320.0)
      },
      input_globalTime: {
        type: "f",
        value: 0.0
      },
      input_skeletons: {
        type: "fv1",
        value: this.inputs
      }
    };

    // merge, and optionally override.
    if (uniformExtras) {
      for (var attr in uniformExtras) {
        this.uniforms[attr] = uniformExtras[attr];
      }
    }

    var material = new Three.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });

    var mesh = new Three.Mesh(geometry, material);
    scene.add(mesh);

    var render = () => {
      this.uniforms.input_globalTime.value += 0.05;
      this.uniforms.input_skeletons.value = this.inputs;
      renderer.render(scene, camera);
      this.renderID = requestAnimationFrame(render);
    };

    this.renderID = requestAnimationFrame(render);
  };

  this.stop = () => {
    cancelAnimationFrame(this.renderID);
    if(this.audio) {
      this.audio.stop();
    }
  };
};

module.exports = {
  Mode: Mode,
  ShaderMode: ShaderMode
};
