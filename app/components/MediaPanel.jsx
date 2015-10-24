let React = require('react');

let Panel = require('react-bootstrap').Panel;
let ListGroup = require('react-bootstrap').ListGroup;
let ListGroupItem = require('react-bootstrap').ListGroupItem;
let ButtonToolbar = require('react-bootstrap').ButtonToolbar;
let Button = require('react-bootstrap').Button;

// <a href="#" className="list-group-item" ng-repeat="mode in loadedModes" ng-click="showMode(mode.id)" ng-className='{"active":(activeMode.id == mode.id) }'>mode.title</a>

module.exports = React.createClass({
    render: function() {
        let modeListing = this.props.data.map(function(mode) {
            return (
                <ListGroupItem>
                  {mode.title}
                </ListGroupItem>
            );
        });
        return (
            <Panel header="Select Mode">
              <ListGroup>
                {modeListing}
              </ListGroup>
              <ButtonToolbar>
                <Button>
                  Clear Mode
                </Button>
                <Button>
                  Toggle Kinect Off
                </Button>
              </ButtonToolbar>
          </Panel>
        );
    }
});
