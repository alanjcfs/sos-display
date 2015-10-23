'use strict';

let Mode = require('./mode.js').Mode;

var React = require('react');
var ReactDOM = require('react-dom');

let layout = require('./components/Layout');

ReactDOM.render(
  layout,
  document.getElementById('main')
);
