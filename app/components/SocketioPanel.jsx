let React = require('react');

let Panel = require('react-bootstrap').Panel;
let client = require('../kinect/client');
let ButtonGroup = require('react-bootstrap').ButtonGroup;
let Button = require('react-bootstrap').Button;
let MenuItem = require('react-bootstrap').MenuItem;

let actions = require('../actions');

module.exports = React.createClass({
    render: function() {

        return (
            <Panel header="Socket.io Controls">
                connected: {client.connected() ? "true" : "false"}
            </Panel>
        );
    }
});
