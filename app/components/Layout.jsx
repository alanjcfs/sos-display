
let React = require('react');

let Header = require('./Header');
let Canvas = require('./Canvas');
let MediaPanel = require('./MediaPanel');
let ControlPanel = require('./ControlPanel');
let ModeInformation = require('./ModeInformation');

let Layout = React.createClass({

    getInitialState: function() {
        return {
            control: {
                development: true,
                offsets: { x: 0, y: 15 }
            }
        };
    },

    onControlToggle: function(is_development) {
        this.setState({
            control: {
                development: is_development,
                offsets: this.state.control.offsets
            }
        });
    },

    onOffsetChange: function(x, y) {
        this.setState({
            control: {
                development: this.state.control.development,
                offsets: { x: x || this.state.control.offsets.x, y: y || this.state.control.offsets.y }
            }
        });
    },

    render: function() {
        return (
            <div className="container-fluid">
              <Header />
              <div className="row" ng-controller="CanvasCtrl">
                <div className="col-md-5">
                  <Canvas />
                </div>
                <div className="col-md-4">
                  <MediaPanel />
                  <ControlPanel data={this.state.control} onControlToggle={this.onControlToggle} onOffsetChange={this.onOffsetChange} />
                </div>
                <div className="col-md-3">
                  <ModeInformation />
                </div>
              </div>
            </div>
        );
    }
});

module.exports = <Layout />