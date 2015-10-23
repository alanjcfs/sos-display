let React = require('react');

let Input = require('react-bootstrap').Input;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
              <h4>Adjust offsets:</h4>
              <form>
                <Input type="text" addonBefore="X Offset" value={this.props.data.x} />
                <Input type="text" addonBefore="Y Offset" value={this.props.data.y} />
              </form>
            </div>
        );
    }
});
