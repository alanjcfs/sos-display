let React = require('react');

let Panel = require('react-bootstrap').Panel;

module.exports = React.createClass({
    render: function() {
        return (
            <Panel header="Mode Information">
            <div className="panel-body">
              <table className="table table-striped">
                <tbody>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
                <tr ng-repeat="(key,value) in debugInfo">
                  <td>
                    <samp>key</samp>
                  </td>
                  <td>
                    <samp>value</samp>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        );
    }
});
