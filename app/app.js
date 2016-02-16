let ReactDOM = require('react-dom');
let Layout = require('./components/Layout');

// start off the kinect server listener.
require('./kinect/client');

ReactDOM.render(
  Layout,
  document.getElementById('main')
);
