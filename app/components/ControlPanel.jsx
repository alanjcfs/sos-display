let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;
let ButtonGroup = require('react-bootstrap').ButtonGroup;

let CanvasOffset = require('./CanvasOffset');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            development: true
        };
    },

    onClick: function(is_development, e) {
        this.setState({
            development: is_development
        });
    },

    dev_message: 'The canvas element on your left is displaying in the same manner that it would appear on the LED wall.',
    prod_message: 'The canvas element on your left is rotated -90 degrees, so it will appear correctly on the LED wall.',

    render: function() {
        let message = this.state.development ? this.dev_message : this.prod_message;
        return (
            <Panel header="Canvas Controls">
              <ButtonGroup>
                <Button onClick={this.onClick.bind(this, true)} active={this.state.development} bsStyle="primary">
                  Development Mode
                </Button>
                <Button onClick={this.onClick.bind(this, false)} active={!this.state.development}>
                  LED Display Mode (rotated)
                </Button>
              </ButtonGroup>
              <h4>
                Currently in <strong>{this.state.development ? 'development' : 'production'}</strong> mode.
              </h4>
              <p>
                {message}
              </p>
              <CanvasOffset />
            </Panel>
        );
    }
});
