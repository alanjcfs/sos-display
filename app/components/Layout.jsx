
let React = require('react');
let Reflux = require('reflux');

let Col = require('react-bootstrap').Col;
let Row = require('react-bootstrap').Row;

let Header = require('./Header');
let Canvas = require('./Canvas');
let MediaPanel = require('./MediaPanel');
let ControlPanel = require('./ControlPanel');
let ModeInformation = require('./ModeInformation');

let store = require('../store');

let Layout = React.createClass({

    mixins: [ Reflux.connect(store, "data") ],

    render: function() {
        return (
            <Col fluid={true}>
              <Header />
              <Row>
                <Col xs={5}>
                  <Canvas />
                </Col>
                <Col xs={4}>
                  <MediaPanel data={this.state.data.modes} />
                  <ControlPanel data={this.state.data.control} />
                </Col>
                <Col xs={3}>
                  <ModeInformation />
                </Col>
              </Row>
            </Col>
        );
    }
});

module.exports = <Layout />
