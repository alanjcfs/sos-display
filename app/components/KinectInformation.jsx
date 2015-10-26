let React = require('react');

let _ = require('underscore');
let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;
let TreeView = require('./react-bootstrap-treeview').TreeView;

module.exports = React.createClass({
    render: function() {
        let hands = _.map(this.props.data.hands, function(hand, index) {
            return (
                <tr key={index}>
                  <th>{hand.x}</th>
                  <th>{hand.y}</th>
                </tr>
            );
        });
        return (
            <Table striped bordered condensed>
              <tbody>
                <tr>
                  <th>Number of detected figures</th>
                  <th>{this.props.data.skeletons.length}</th>
                </tr>
                <tr>
                  <th>Hand coordinates</th>
                  <th>
                    <Table striped bordered condensed >
                      <thead>
                        <tr>
                          <th>x</th>
                          <th>y</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hands}
                      </tbody>
                    </Table>
                  </th>
                </tr>
                <tr>
                  <th>Skeleton Data</th>
                  <th>
                    <TreeView data={this.props.data.skeletons} />
                  </th>
                </tr>
              </tbody>
            </Table>
        )
    }
});
