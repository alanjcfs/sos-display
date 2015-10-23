
let React = require('react');
let Header = require('./Header');
let Canvas = require('./Canvas');
let MediaPanel = require('./MediaPanel');
let ControlPanel = require('./ControlPanel');
let ModeInformation = require('./ModeInformation');

module.exports =
  <div className="container-fluid">
    <Header />
    <div className="row" ng-controller="CanvasCtrl">
      <div className="col-md-5">
        <Canvas />
      </div>
      <div className="col-md-4">
        <MediaPanel />
        <ControlPanel />
      </div>
      <div className="col-md-3">
        <ModeInformation />
      </div>
    </div>
  </div>
