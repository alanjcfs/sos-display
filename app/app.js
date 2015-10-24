'use strict';

let Mode = require('./mode').Mode;
let shaders = require('./modes/shaders');

let modes = [ shaders.bubbles,
              shaders.caustic,
              shaders.cloudten,
              shaders.disco,
              shaders.echoplex,
              shaders.flame,
              shaders.hell,
              shaders.nyan,
              shaders.ribbon,
              shaders.seascape,
              shaders.stardust,
              shaders.storm,
              shaders.truchet,
              shaders.tunnel,
              shaders.vortex,
              shaders.worms,
            ];

var ReactDOM = require('react-dom');
let Layout = require('./components/Layout');

ReactDOM.render(
  Layout,
  document.getElementById('main')
);
