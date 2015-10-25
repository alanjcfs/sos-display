'use strict';

let _ = require('underscore');
let Three = require('three.js');

let actions = require('../actions');
let Timer = require('../util').Timer;
let vertexShader = require('./shaders/generic.vert.glsl');

let jumpInterval = 5 * 60; // in seconds

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

    // re-assign the vertex shader so that WebGL doesn't complain.
    this.vertexShader = vertexShader;
    this.fragmentShader = args.fragmentShader;
    this.uniforms = null;

    if (this.audio) {
      this.audio.start();
    }

    // global uniforms.
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

    // merge extra uniforms (override if necessary).
    let uniformExtras = args.uniformExtras || {};
    if (uniformExtras) {
      for (let attr in uniformExtras) {
        this.uniforms[attr] = uniformExtras[attr];
      }
    }

    let material = new Three.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });

    let scene = new Three.Scene();
    let geometry = new Three.PlaneBufferGeometry(2, 2);
    let camera = new Three.PerspectiveCamera(7, renderer.domElement.width / renderer.domElement.height, 0.1, 100000);
    let mesh = new Three.Mesh(geometry, material);
    camera.position.z = 1;
    scene.add(mesh);

    let timer = new Timer();
    setInterval(function() {
      actions.updateModeFPS(timer.fps());
    }, 1000);

    let render = (now) => {
      timer.tick(now);
      this.uniforms.input_globalTime.value += 0.05;
      this.uniforms.input_skeletons.value = this.inputs;
      actions.updateModeInformation(this.uniforms);
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

// functionality for jumping randomly.
let jumping = undefined;
actions.toggleModeJumps.listen(function(on) {
  console.log("on", on);
  if(on) {
    jumping = setInterval(function() {
      actions.randomMode();
    }, 1000 * jumpInterval);
  } else {
    clearInterval(jumping);
  }
});

module.exports = {
  Mode: Mode,
  ShaderMode: ShaderMode
};
