
let React = require('react');
let Pixi = require('pixi.js');
let Three = require('three.js');

let actions = require('../actions');

module.exports = React.createClass({
    width: 192,
    height: 320,

    // we want to set up the renderers exactly once, otherwise we will
    // get a "too many opengl contexts" error.
    pixiRenderer: null,
    threeRenderer: null,

    canvas: null,
    kinectOverlay: null,

    setModeCanvas: function(mode) {
        console.log(this.threeRenderer);
        let renderer = mode.renderType == "PIXI" ? this.pixiRenderer.view : this.threeRenderer.domElement;
        let child = canvas.children[0];
        if (child) {
            canvas.replaceChild(renderer, child);
        } else {
            canvas.appendChild(renderer);
        }
    },

    componentDidMount: function() {
        let args = { backgroundColor : 0x1099bb, antialias: true };
        this.pixiRenderer = Pixi.autoDetectRenderer(this.width, this.height, args);
        this.threeRenderer = new Three.WebGLRenderer();
        this.threeRenderer.setSize(this.width, this.height);

        this.canvas = document.getElementById("canvas");
        this.kinectOverlay = document.getElementById("kinect-overlay");

        // go ahead and run the current mode.
        let mode = this.props.data.modes.current;
        this.setModeCanvas(mode);
        mode.start();

        actions.setMode.listen(this.onSetMode);
    },

    onSetMode: function(oldMode, newMode) {
        oldMode.stop();
        this.setModeCanvas(newMode);
        newMode.start();
    },

    render: function() {
        let style = {
            left: this.props.data.control.offsets.x + 'px',
            top: this.props.data.control.offsets.y + 'px'
        };
        return (
            <div>
              <div id="kinect-overlay" style={style}></div>
              <div id="canvas" style={style}></div>
            </div>
        );
    }
});
