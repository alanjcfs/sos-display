let React = require('react');

let Input = require('react-bootstrap').Input;

module.exports = React.createClass({

    onChangeX: function(event) {
        let result = parseInt(event.target.value);
        if (!isNaN(result)) {
            this.props.onOffsetChange(result, undefined);
        }
    },

    onChangeY: function(event) {
        let result = parseInt(event.target.value);
        if (!isNaN(result)) {
            this.props.onOffsetChange(undefined, result);
        }
    },

    render: function() {
        return (
            <div>
              <h4>Adjust offsets:</h4>
              <form>
                <Input type="text" addonBefore="X Offset" value={this.props.data.x} onChange={this.onChangeX} />
                <Input type="text" addonBefore="Y Offset" value={this.props.data.y} onChange={this.onChangeY} />
              </form>
            </div>
        );
    }
});
