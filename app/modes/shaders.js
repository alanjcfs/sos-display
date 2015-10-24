'use strict';

let Three = require('three.js');

let ShaderMode = require('./mode').ShaderMode;

let loader = new Three.TextureLoader();

let bubbles = new ShaderMode({ id: 'Bubbles',
                               title: 'Bubbles PS',
                               fragmentShader: require('./shaders/bubbles.frag.glsl') });

let caustic = new ShaderMode({ id: 'Caustic',
                               title: 'Caustic PS',
                               fragmentShader: require('./shaders/caustic.frag.glsl') });

let cloudten = new ShaderMode({ id: 'CloudTen',
                                title: 'Cloud Ten PS',
                                fragmentShader: require('./shaders/cloudten.frag.glsl'),
                                loadUniforms: function() {
                                  var tex = loader.load('static/images/tex16.png');
	                          tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                  var res = new Three.Vector2(256.0, 256.0);
                                  return { input_channel0: { type: "t", value: tex },
                                           input_channel0_resolution: { type: "v2", value: res } };
                                }
                              });

let disco = new ShaderMode({ id: 'Disco',
                             title: 'Disco PS',
                             // audio: audioDisco,
                             fragmentShader: require('./shaders/disco.frag.glsl') });

let echoplex = new ShaderMode({ id: 'Echoplex',
                                title: 'Echoplex PS',
                                fragmentShader: require('./shaders/echoplex.frag.glsl'),
                                loadUniforms: function() {
	                          var tex = loader.load('static/images/tex07.jpg');
	                          tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                  return { input_channel0: { type: "t", value: tex } };
                                }
                              });

let flame = new ShaderMode({ id: 'Flame',
                             title: 'Flame PS',
                             fragmentShader: require('./shaders/flame.frag.glsl') });

let hell = new ShaderMode({ id: 'Hell',
                            title: 'Hell PS',
                            fragmentShader: require('./shaders/hell.frag.glsl'),
                            loadUniforms: function() {
	                      var tex = loader.load('static/images/tex16.png');
	                      tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                              var res = new Three.Vector2(256.0, 256.0);
                              return { input_channel0: { type: "t", value: tex },
                                       input_channel0_resolution: { type: "v2", value: res } };
                            }
                          });

let nyan = new ShaderMode({ id: 'Nyan',
                            title: 'Nyan PS',
                            fragmentShader: require('./shaders/nyan.frag.glsl'),
                            disableKinect: true,
                            loadUniforms: function() {
	                      var anim = loader.load('static/images/tex14.png');
                              var stars = loader.load('static/images/tex03.jpg');
	                      stars.wrapS = stars.wrapT = Three.RepeatWrapping;
	                      anim.wrapS = anim.wrapT = Three.RepeatWrapping;
                              anim.minFilter = anim.magFilter = Three.NearestFilter;
                              return { input_channel0: { type: "t", value: anim },
                                       input_channel1: { type: "t", value: stars },
                                       input_resolution: { type: "v2", value: new Three.Vector2(240.0, 140.0) }
                                     };
                            }
                          });

let ribbon = new ShaderMode({ id: 'Ribbon',
                              title: 'Ribbon PS',
                              fragmentShader: require('./shaders/ribbon.frag.glsl') });

let seascape = new ShaderMode({ id: 'Seascape',
                                title: 'Seascape PS',
                                fragmentShader: require('./shaders/seascape.frag.glsl') });

let stardust = new ShaderMode({ id: 'Stardust',
                                title: 'Stardust PS',
                                fragmentShader: require('./shaders/stardust.frag.glsl') });

let storm = new ShaderMode({ id: 'Storm',
                             title: 'Storm PS',
                             fragmentShader: require('./shaders/storm.frag.glsl'),
                             loadUniforms: function() {
	                       var tex = loader.load('static/images/tex16.png');
	                       tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                               var res = new Three.Vector2(256.0, 256.0);
                               return { input_channel0: { type: "t", value: tex },
                                        input_channel0_resolution: { type: "v2", value: res } };
                             }
                        });

let truchet = new ShaderMode({ id: 'Truchet',
                               title: 'Truchet PS',
                               fragmentShader: require('./shaders/truchet.frag.glsl'),
                               loadUniforms: function() {
                                 var cube = new Three.CubeTextureLoader(['static/images/cube00.png',
	                                                                 'static/images/cube01.png',
	                                                                 'static/images/cube02.png',
	                                                                 'static/images/cube03.png',
	                                                                 'static/images/cube04.png',
	                                                                 'static/images/cube05.png']);
                                 // yes, the resolution given is not correct. this is because the
                                 // original shader code has a bug in it when x-res > y-res.
                                 return {
                                   input_resolution: { type: "v2", value: new Three.Vector2(320.0, 480.0) },
                                   input_channel0: { type: "t", value: cube }
                                 };
                               }
                             });

let tunnel = new ShaderMode({ id: 'Tunnel',
                              title: 'Tunnel PS',
                              fragmentShader: require('./shaders/tunnel.frag.glsl') });

let vortex = new ShaderMode({ id: 'Vortex',
                              title: 'Vortex PS',
                              fragmentShader: require('./shaders/vortex.frag.glsl'),
                              loadUniforms: function() {
	                        var tex = loader.load('static/images/tex16.png');
	                        tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                var res = new Three.Vector2(256.0, 256.0);
                                return { input_channel0: { type: "t", value: tex },
                                         input_channel0_resolution: { type: "v2", value: res } };
                              }
                            });

let worms = new ShaderMode({ id: 'Worms',
                             title: 'Worms PS',
                             fragmentShader: require('./shaders/worms.frag.glsl') });

module.exports = {
  bubbles: bubbles,
  caustic: caustic,
  cloudten: cloudten,
  disco: disco,
  echoplex: echoplex,
  flame: flame,
  hell: hell,
  nyan: nyan,
  ribbon: ribbon,
  seascape: seascape,
  stardust: stardust,
  storm: storm,
  truchet: truchet,
  tunnel: tunnel,
  vortex: vortex,
  worms: worms
};
