let React = require('react');

let _ = require('underscore');
let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;

module.exports = React.createClass({
    render: function() {
        let info = _.map(this.props.data, function(elem, key) {
            let value = elem.value;
            if(value.image) {
                // `JSON.stringify` for this particular value doesn't work well
                let src = value.image.currentSrc.split('/');
                value = {
                    image: {
                        height: value.image.height,
                        width: value.image.width,
                        source: src[src.length - 1]
                    }
                };
            }
            return (
                <tr key={key}>
                  <th>{key}</th>
                  <th>{elem.type}</th>
                  <th>{JSON.stringify(value)}</th>
                </tr>
            );
        });

        if(info.length === 0) {
            info = (
                <tr>
                  <th colSpan="3">No mode information available.</th>
                </tr>
            )
        }
        return (
            <Table striped bordered condensed>
              <thead>
                <tr>
                  <th>Mode Key</th>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {info}
              </tbody>
            </Table>
        )
    }
});