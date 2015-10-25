let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;
let KinectInformation = require('./KinectInformation');
let ModeInformation = require('./ModeInformation');

module.exports = React.createClass({
    render: function() {
        return (
            <Panel header="Statistics">
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <th>Kinect FPS</th>
                  <th>{this.props.data.kinectFPS}</th>
                </tr>
                <tr>
                  <th>Mode FPS</th>
                  <th>{this.props.data.modeFPS}</th>
                </tr>
                <tr>
                  <th>Elapsed Time (s)</th>
                  <th>{this.props.data.elapsed}</th>
                </tr>
              </tbody>
            </Table>
            <KinectInformation data={this.props.data.kinect} />
            <ModeInformation data={this.props.data.mode} />
          </Panel>
        );
    }
});
