let React = require('react');

let Panel = require('react-bootstrap').Panel;
let ListGroup = require('react-bootstrap').ListGroup;
let ListGroupItem = require('react-bootstrap').ListGroupItem;
let ButtonGroup = require('react-bootstrap').ButtonGroup;
let Button = require('react-bootstrap').Button;
let DropdownButton = require('react-bootstrap').DropdownButton;
let MenuItem = require('react-bootstrap').MenuItem;

let actions = require('../actions');

module.exports = React.createClass({
    render: function() {
        let current = this.props.data.current;
        let modeListing = this.props.data.list.map(function(mode) {
            return (
                <MenuItem key={mode.id} onClick={actions.setMode.bind(this, current, mode)}>
                  {mode.title}
                </MenuItem>
            );
        });
        return (
            <Panel header="Mode Controls">
              <DropdownButton title="Select Mode" id="select-mode">
                {modeListing}
              </DropdownButton>
              <h6>
                Currently showing <strong>{current.title}</strong>.
              </h6>
              <ButtonGroup vertical bsSize="sm">
                <Button onClick={actions.resetMode.bind(this)}>
                  Reset Mode
                </Button>
                <Button onClick={actions.toggleKinect.bind(this, !this.props.data.kinect)} active={!this.props.data.kinect}>
                  Toggle Kinect {this.props.data.kinect ? "Off" : "On"}
                </Button>
                <Button onClick={actions.toggleModeInformation.bind(this, !this.props.data.debug)} active={!this.props.data.debug}>
                  {this.props.data.debug ? "Hide" : "Show"} Mode Information
                </Button>
                <Button onClick={actions.toggleModeJumps.bind(this, !this.props.data.jumps)} active={!this.props.data.jumps}>
                  {this.props.data.jumps ? "Disable" : "Enable"} Random Jumps
                </Button>
              </ButtonGroup>
          </Panel>
        );
    }
});
