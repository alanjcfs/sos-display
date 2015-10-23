let React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            x: 15,
            y: 0
        };
    },

    render: function() {
        return (
            <div>
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
        );
    }
});
