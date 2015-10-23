
let React = require('react');
let Reflux = require('reflux');

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
            <div className="container-fluid">
              <Header />
              <div className="row" ng-controller="CanvasCtrl">
                <div className="col-md-5">
                  <Canvas />
                </div>
                <div className="col-md-4">
                  <MediaPanel />
                  <ControlPanel data={this.state.data.control} />
                </div>
                <div className="col-md-3">
                  <ModeInformation />
                </div>
              </div>
            </div>
        );
    }
});

module.exports = <Layout />