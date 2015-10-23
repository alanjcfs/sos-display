let React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Select Mode</h3>
            </div>
            <div className="panel-body">
              <div className="list-group">
                <a href="#" className="list-group-item" ng-repeat="mode in loadedModes" ng-click="showMode(mode.id)" ng-className='{"active":(activeMode.id == mode.id) }'>mode.title</a>
              </div>
              <button className="btn btn-default" type="submit" ng-click="showMode()">Clear Mode</button>
              <button className="btn btn-default" type="submit" ng-click="toggleKinectOverlay()">Toggle Kinect Overlay</button>
            </div>
          </div>
        );
    }
});
