let angular  = require('angular');
let services = angular.module('sos.services');
services.service('audioService', function($rootScope, $log, $q) {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  let self = this;

  this.context = new AudioContext();

  this.loadBuffer = function(fileName) {
    let deferred = $q.defer();
    let request = new XMLHttpRequest();
    request.open('GET', 'audio/' + fileName, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      self.context.decodeAudioData(request.response, function(buffer) {
        deferred.resolve(buffer);
      });
    };
    request.send();
    return deferred.promise;
  };
});
