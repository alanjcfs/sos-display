'use strict';

let Reflux = require('reflux');
let actions = require('./actions');

// Thus the flow is: User interaction -> component calls action ->
// store reacts and triggers -> components update

let Mode = require('./mode.js').Mode;

let modes = [ 'modeTruchet',
              'modeSeascape',
              'modeEchoplex',
              'modeFlame',
              'modeBubbles',
              'modeCaustic',
              'modeCloudTen',
              'modeDisco',
              'modeHell',
              'modeRibbon',
              'modeStardust',
              'modeStorm',
              'modeTunnel',
              'modeVortex',
              'modeWorms',
              'modeNyan'
            ];

var ReactDOM = require('react-dom');
let Layout = require('./components/Layout');

ReactDOM.render(
  Layout,
  document.getElementById('main')
);
