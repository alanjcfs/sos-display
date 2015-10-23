let React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Mode Information</h3>
            </div>
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
          </div>
        );
    }
});
