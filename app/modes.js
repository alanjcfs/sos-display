'use strict';

let shaders = require('./modes/shaders');
let image = require('./modes/image');

module.exports = [ shaders.bubbles,
                   shaders.caustic,
                   shaders.cloudten,
                   shaders.disco,
                   shaders.echoplex,
                   shaders.flame,
                   shaders.hell,
                   image,
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
