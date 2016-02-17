let _ = require('underscore');
let Three = require('three');
let Pixi = require('pixi.js');

let util = require('../util');
let actions = require('../actions');
let kinectActions = require('../kinect/actions');
let vertexShader = require('./shaders/generic.vert.glsl');

const jumpInterval = 5 * 60; // in seconds
let inputs = _(32).times(function() { return 0.0; }); // shader inputs

let Mode = function(id, title) {
  this.id = id;
  this.title = title;
  this.audio = null;
  this.renderID = null;
  this.rendererType = 'PIXI';
  this.kinectEnabled = true;
  this.container = new Pixi.Container();

  this.start = (renderer) => {

    let timer = new util.Timer();
    setInterval(function() {
      actions.updateModeFPS(timer.fps());
    }, 1000);

    let render = (now) => {
      timer.tick(now);
      renderer.render(this.container);
      actions.updateModeInformation({});
      requestAnimationFrame(render);
    };

    this.renderID = requestAnimationFrame(render);
  };

  this.stop = () => {
    cancelAnimationFrame(this.renderID);
  };
};

let ShaderMode = function(args) {

  this.id = args.id;
  this.title = args.title;
  this.audio = args.audio;
  this.renderID = null;
  this.rendererType = 'THREE';
  this.kinectEnabled = args.disableKinect ? false : true; // default to true

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
      'input_resolution': {
        type: 'v2',
        value: new Three.Vector2(192.0, 320.0)
      },
      'input_globalTime': {
        type: 'f',
        value: 0.0
      },
      'input_skeletons': {
        type: 'fv1',
        value: inputs
      }
    };

    // merge extra uniforms (override if necessary).
    let uniformExtras = args.uniformExtras || {};
    if (uniformExtras) {
      for (let attr in uniformExtras) {
        if ({}.hasOwnProperty.call(uniformExtras, attr)) {
          this.uniforms[attr] = uniformExtras[attr];
        }
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

    let timer = new util.Timer();
    setInterval(function() {
      actions.updateModeFPS(timer.fps());
    }, 1000);

    let render = (now) => {
      timer.tick(now);
      this.uniforms.input_globalTime.value += 0.05;
      this.uniforms.input_skeletons.value = inputs;
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
let jumping;
actions.toggleModeJumps.listen(function(on) {
  if(on) {
    jumping = setInterval(function() {
      actions.randomMode();
    }, 1000 * jumpInterval);
  } else {
    clearInterval(jumping);
  }
});

// normalize for shader inputs.
kinectActions.updateHands.listen(function(hands) {
  for(let i=0; i<Math.min(hands.length, 16); i++) {
    inputs[i*2+0] = util.clamp(hands[i].x / 192);
    inputs[i*2+1] = util.clamp(hands[i].y / 320);
  }
});

module.exports = {
  Mode: Mode,
  ShaderMode: ShaderMode
};
