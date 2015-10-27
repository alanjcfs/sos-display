'use strict';

var ReactDOM = require('react-dom');
let Layout = require('./components/Layout');

// start off the kinect server listener.
let client = require('./kinect/client');

ReactDOM.render(
  Layout,
  document.getElementById('main')
);
