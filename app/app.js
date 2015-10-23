'use strict';

let Mode = require('./mode.js').Mode;

var React = require('react');
var ReactDOM = require('react-dom');

let t = require('./components/Layout');

ReactDOM.render(
  t,
  document.getElementById('main')
);
