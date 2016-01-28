
let React = require('react');
let Pixi = require('pixi.js');
let Three = require('three');

let actions = require('../actions');
let overlay = require('../kinect/overlay');

module.exports = React.createClass({

    // we want to set up the renderers exactly once, otherwise we will
    // get a "too many opengl contexts" error.
    pixiRenderer: null,
    threeRenderer: null,

    canvas: null,
    kinectOverlay: null,

    setModeCanvas: function(mode) {
        let renderer = mode.rendererType == "PIXI" ? this.pixiRenderer : this.threeRenderer;
        let child = canvas.children[0];
        if (child) {
            canvas.replaceChild(renderer.view, child);
        } else {
            canvas.appendChild(renderer.view);
        }
        return renderer;
    },

    componentDidMount: function() {
        let width = this.props.data.control.width;
        let height = this.props.data.control.height;

        let args1 = { backgroundColor : 0x1099bb, antialias: true };
        let args2 = { antialias: true, transparent: true };
        this.pixiRenderer = Pixi.autoDetectRenderer(width, height, args1);
        this.pixiKinectRenderer = Pixi.autoDetectRenderer(width, height, args2);
        this.threeRenderer = new Three.WebGLRenderer();
        this.threeRenderer.setSize(width, height);
        this.threeRenderer.view = this.threeRenderer.domElement; // for consistency with PIXI

        this.canvas = document.getElementById("canvas");
        this.kinectOverlay = document.getElementById("kinect-overlay");
        this.kinectOverlay.appendChild(this.pixiKinectRenderer.view);

        // go ahead and run the current mode.
        let mode = this.props.data.modes.current;
        let renderer = this.setModeCanvas(mode);
        mode.start(renderer);

        actions.setMode.listen(this.onSetMode);
        actions.toggleKinect.listen(this.onToggleKinect);
        actions.toggleKinect(this.props.data.modes.kinect);
    },

    onToggleKinect: function(on) {
        if(on) {
            overlay.start(this.pixiKinectRenderer);
        } else {
            overlay.stop(this.pixiKinectRenderer);
        }
    },

    onSetMode: function(oldMode, newMode) {
        oldMode.stop();
        let renderer = this.setModeCanvas(newMode);
        newMode.start(renderer);
    },

    render: function() {
        let style = {
            left: this.props.data.control.offsets.x + 'px',
            top: this.props.data.control.offsets.y + 'px'
        };
        return (
            <div>
              <div id="kinect-overlay" style={style} className={this.props.data.control.development ? "" : "rotate"}></div>
              <div id="canvas" style={style} className={this.props.data.control.development ? "" : "rotate"}></div>
            </div>
        );
    }
});
