'use strict';
let React = require('react');

let Input = require('react-bootstrap').Input;

let actions = require('../actions');

module.exports = React.createClass({

    onChange: function(coord, event) {
        let result = parseInt(event.target.value);
        if (!isNaN(result)) {
            actions.adjustOffset(coord, result);
        }
    },

    render: function() {
        return (
            <div>
              <h4>Adjust offsets:</h4>
              <form>
                <Input type="text" addonBefore="X Offset" value={this.props.data.x} onChange={this.onChange.bind(this, 'x')} />
                <Input type="text" addonBefore="Y Offset" value={this.props.data.y} onChange={this.onChange.bind(this, 'y')} />
              </form>
            </div>
        );
    }
});
