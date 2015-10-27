'use strict';

let shaders = require('./modes/shaders');
let image = require('./modes/image');
let slowclap = require('./modes/slowclap');

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
                   slowclap,
                   shaders.stardust,
                   shaders.storm,
                   shaders.truchet,
                   shaders.tunnel,
                   shaders.vortex,
                   shaders.worms,
                 ];
