
let React = require('react');
let Reflux = require('reflux');

let Col = require('react-bootstrap').Col;
let Row = require('react-bootstrap').Row;
let Grid = require('react-bootstrap').Grid;

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
            <Grid fluid={true}>
              <Header />
              <Row>
                <Col xs={5} md={4}>
                  <Canvas />
                </Col>
                <Col xs={4} md={2}>
                  <MediaPanel data={this.state.data.modes} />
                  <ControlPanel data={this.state.data.control} />
                </Col>
                <Col xs={9} md={6}>
                  <ModeInformation />
                </Col>
              </Row>
            </Grid>
        );
    }
});

module.exports = <Layout />
