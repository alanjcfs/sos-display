let React = require('react');
let Pixi = require('pixi.js');

module.exports = React.createClass({
    width: 192,
    height: 320,

    componentDidMount: function() {
        let renderer = Pixi.autoDetectRenderer(this.width, this.height, { backgroundColor : 0x1099bb, antialias: true });
        document.getElementById("canvas").appendChild(renderer.view);
    },

    render: function() {
        let style = {
            left: this.props.data.x + 'px',
            top: this.props.data.y + 'px'
        };
        return (
            <div>
              <div id="kinect-overlay" style={style}></div>
              <div id="canvas" style={style}></div>
            </div>
        );
    }
});
