'use strict';

let Three = require('three.js').THREE;

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
  this.inputs = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  this.kinectEnabled = args.disableKinect ? false : true; // default to true

  var uniformExtras = null;

  this.start = () => {

    // WebGL will throw a hissyfit if you reuse shaders/patterns
    // from a previous canvas/context, so we need to explicitly
    // null out everything and re-init.
    this.vertexShader = null;
    this.fragmentShader = null;
    this.uniforms = null;

    // optionally load extra stuff that the shader needs.
    if (args.loadUniforms) {
      uniformExtras = args.loadUniforms();
    }

    var xhrLoader = new Three.XHRLoader();
    xhrLoader.load(document.getElementById('genericVert').src, (resp) => {
      this.vertexShader = resp;
      xhrLoader.load(document.getElementById(args.pixelShaderName).src, (resp) => {
        this.fragmentShader = resp;
        if (this.audio) {
          this.audio.start();
        }
        this.startRender();
      });
    });

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
  };

  this.startRender = () => {

    var camera = new Three.PerspectiveCamera(7, this.parentScope.threejs.renderer.domElement.width / this.parentScope.threejs.renderer.domElement.height, 0.1, 100000);
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

    // poor man's mutex
    this.blocking = false;

    var render = () => {
      if(this.blocking) {
        return; // wait!
      }
      this.blocking = true;
      this.uniforms.input_globalTime.value += 0.05;
      this.uniforms.input_skeletons.value = this.inputs;
      this.parentScope.threejs.renderer.render(scene, camera);
      this.renderID = requestAnimationFrame(render);
      this.blocking = false;
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
