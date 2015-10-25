let React = require('react');

let _ = require('underscore');
let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;

module.exports = React.createClass({
    render: function() {
        let info = _.map(this.props.data.mode, function(elem, key) {
            let value = elem.value;
            if(value.image) {
                // `JSON.stringify` for this particular value doesn't work well
                let src = value.image.currentSrc.split('/');
                value = {
                    image: {
                        height: value.image.height,
                        width: value.image.width,
                        source: src[src.length - 1]
                    }
                };
            }
            return (
                <tr key={key}>
                  <th>{key}</th>
                  <th>{elem.type}</th>
                  <th>{JSON.stringify(value)}</th>
                </tr>
            );
        });

        return (
            <Panel header="Mode Information">
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
                <tr>
                  <th>Number of detected figures</th>
                  <th>{this.props.data.skeletons.length}</th>
                </tr>
                <tr>
                  <th>Mode information</th>
                  <th>
                    <Table striped bordered>
                      <tbody>
                        {info}
                      </tbody>
                    </Table>
                  </th>
                </tr>
              </tbody>
            </Table>
          </Panel>
        );
    }
});
