let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;
let Sparklines = require('react-sparklines').Sparklines;
let SparklinesLine = require('react-sparklines').SparklinesLine;
let SparklinesSpots = require('react-sparklines').SparklinesSpots;
let DataProcessor = require('react-sparklines').DataProcessor;

let KinectInformation = require('./KinectInformation');
let ModeInformation = require('./ModeInformation');

// hack to work around sparklines not updating dynamically.
Sparklines.prototype.shouldComponentUpdate = () => {
    return true;
};

module.exports = React.createClass({
    render: function() {
        return (
            <Panel header="Statistics">
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <th>Kinect FPS</th>
                  <th>
                    {this.props.data.kinectFPS}
                    &nbsp;
                    <Sparklines data={this.props.data.kinectFPSHistory} limit={20} width={200} height={60}>
                      <SparklinesLine color="#1c8cdc" />
                      <SparklinesSpots />
                    </Sparklines>
                   </th>
                </tr>
                <tr>
                  <th>Mode FPS</th>
                  <th>
                    {this.props.data.modeFPS}
                    &nbsp;
                    <Sparklines data={this.props.data.modeFPSHistory} limit={20} width={200} height={60}>
                      <SparklinesLine color="#fa7e17" />
                      <SparklinesSpots />
                    </Sparklines>
                   </th>
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
