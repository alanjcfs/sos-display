let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;

module.exports = React.createClass({
    render: function() {
        return (
            <Panel header="Mode Information">
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <th>FPS</th>
                  <th>{this.props.data.fps}</th>
                </tr>
                <tr>
                  <th>Number of detected figures</th>
                  <th>{this.props.data.skeletons.length}</th>
                </tr>
              </tbody>
            </Table>
          </Panel>
        );
    }
});
