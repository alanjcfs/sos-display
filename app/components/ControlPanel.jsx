let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;
let ButtonGroup = require('react-bootstrap').ButtonGroup;

let CanvasOffset = require('./CanvasOffset');

module.exports = React.createClass({

    onClick: function(is_development, e) {
        this.props.onControlToggle(is_development);
    },

    dev_message: 'The canvas element on your left is displaying in the same manner that it would appear on the LED wall.',
    prod_message: 'The canvas element on your left is rotated -90 degrees, so it will appear correctly on the LED wall.',

    render: function() {
        let message = this.props.data.development ? this.dev_message : this.prod_message;
        return (
            <Panel header="Canvas Controls">
              <ButtonGroup>
                <Button onClick={this.onClick.bind(this, true)} active={this.props.data.development} bsStyle="primary">
                  Development Mode
                </Button>
                <Button onClick={this.onClick.bind(this, false)} active={!this.props.data.development}>
                  LED Display Mode (rotated)
                </Button>
              </ButtonGroup>
              <h4>
                Currently in <strong>{this.props.data.development ? 'development' : 'production'}</strong> mode.
              </h4>
              <p>
                {message}
              </p>
              <CanvasOffset data={this.props.data.offsets} />
            </Panel>
        );
    }
});
