let React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Canvas Controls</h3>
            </div>
            <div className="panel-body">

              <div className="btn-group" data-toggle="buttons">
                <label className="btn" ng-className="devModeInputGroupClassName">
                  <input type="radio" name="display-rotate" id="dev-mode" ng-model="wallDisplayMode" value="DEV" autocomplete="off" />Development Mode
                </label>
                <label className="btn" ng-className="prodModeInputGroupClassName">
                  <input type="radio" name="display-rotate" id="prod-mode" ng-model="wallDisplayMode" value="PROD" autocomplete="off" checked="checked" />LED Display Mode (rotated)
                </label>
              </div>

              <div ng-if="wallDisplayMode == 'DEV'">
                <h4>Currently in DEV mode.</h4>
                <p>The canvas element on your left is displaying in the same manner that it would appear on the LED wall.</p>
              </div>
              <div ng-if="wallDisplayMode == 'PROD'">
                <h4>Currently in Wall Display (PROD) mode.</h4>
                <p>The canvas element on your left is rotated -90 degrees, so it will appear correctly on the LED wall.</p>
              </div>

              <h4>Add offset to CANVAS position</h4>
              <form className="form-inline">
                <div className="form-group">
                  <label for="xOffset">X Offset</label>
                  <input type="text" className="form-control" id="xOffset" ng-model="offsetStyle.left" />
                </div>
                <div className="form-group">
                  <label for="yOffset">Y Offset</label>
                  <input type="text" className="form-control" id="yOffset" ng-model="offsetStyle.top" />
                </div>
              </form>
            </div>
          </div>
        );
    }
});
