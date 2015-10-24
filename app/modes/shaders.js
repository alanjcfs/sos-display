'use strict';

let Three = require('three.js');

let ShaderMode = require('../mode').ShaderMode;

let bubbles = new ShaderMode({ id: 'Bubbles',
                               title: 'Bubbles PS',
                               pixelShaderName: 'bubblesFrag' });

let caustic = new ShaderMode({ id: 'Caustic',
                               title: 'Caustic PS',
                               pixelShaderName: 'causticFrag' });

let cloudten = new ShaderMode({ id: 'CloudTen',
                                title: 'Cloud Ten PS',
                                pixelShaderName: 'cloudTenFrag',
                                loadUniforms: function() {
	                          var tex = Three.ImageUtils.loadTexture('media/tex16.png');
	                          tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                  var res = new Three.Vector2(256.0, 256.0);
                                  return { input_channel0: { type: "t", value: tex },
                                           input_channel0_resolution: { type: "v2", value: res } };
                                }
                              });

let disco = new ShaderMode({ id: 'Disco',
                             title: 'Disco PS',
                             // audio: audioDisco,
                             pixelShaderName: 'discoFrag' });

let echoplex = new ShaderMode({ id: 'Echoplex',
                                title: 'Echoplex PS',
                                pixelShaderName: 'echoplexFrag',
                                loadUniforms: function() {
	                          var tex = Three.ImageUtils.loadTexture('media/tex07.jpg');
	                          tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                  return { input_channel0: { type: "t", value: tex } };
                                }
                              });

let flame = new ShaderMode({ id: 'Flame',
                             title: 'Flame PS',
                             pixelShaderName: 'flameFrag' });

let hell = new ShaderMode({ id: 'Hell',
                            title: 'Hell PS',
                            pixelShaderName: 'hellFrag',
                            loadUniforms: function() {
	                      var tex = Three.ImageUtils.loadTexture('media/tex16.png');
	                      tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                              var res = new Three.Vector2(256.0, 256.0);
                              return { input_channel0: { type: "t", value: tex },
                                       input_channel0_resolution: { type: "v2", value: res } };
                            }
                          });

let nyan = new ShaderMode({ id: 'Nyan',
                            title: 'Nyan PS',
                            pixelShaderName: 'nyanFrag',
                            disableKinect: true,
                            loadUniforms: function() {
	                      var anim = Three.ImageUtils.loadTexture('media/tex14.png');
                              var stars = Three.ImageUtils.loadTexture('media/tex03.jpg');
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
                              pixelShaderName: 'ribbonFrag' });

let seascape = new ShaderMode({ id: 'Seascape',
                                title: 'Seascape PS',
                                pixelShaderName: 'seascapeFrag' });

let stardust = new ShaderMode({ id: 'Stardust',
                                title: 'Stardust PS',
                                pixelShaderName: 'stardustFrag' });

let storm = new ShaderMode({ id: 'Storm',
                             title: 'Storm PS',
                             pixelShaderName: 'stormFrag',
                             loadUniforms: function() {
	                       var tex = Three.ImageUtils.loadTexture('media/tex16.png');
	                       tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                               var res = new Three.Vector2(256.0, 256.0);
                               return { input_channel0: { type: "t", value: tex },
                                        input_channel0_resolution: { type: "v2", value: res } };
                             }
                        });

let truchet = new ShaderMode({ id: 'Truchet',
                               title: 'Truchet PS',
                               pixelShaderName: 'truchetFrag',
                               loadUniforms: function() {
                                 var cube = Three.ImageUtils.loadTextureCube(['media/cube00.png',
	                                                                      'media/cube01.png',
	                                                                      'media/cube02.png',
	                                                                      'media/cube03.png',
	                                                                      'media/cube04.png',
	                                                                      'media/cube05.png']);
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
                              pixelShaderName: 'tunnelFrag' });

let vortex = new ShaderMode({ id: 'Vortex',
                              title: 'Vortex PS',
                              pixelShaderName: 'vortexFrag',
                              loadUniforms: function() {
	                        var tex = Three.ImageUtils.loadTexture('media/tex16.png');
	                        tex.wrapS = tex.wrapT = Three.RepeatWrapping;
                                var res = new Three.Vector2(256.0, 256.0);
                                return { input_channel0: { type: "t", value: tex },
                                         input_channel0_resolution: { type: "v2", value: res } };
                              }
                            });

let worms = new ShaderMode({ id: 'Worms',
                             title: 'Worms PS',
                             pixelShaderName: 'wormsFrag' });

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
