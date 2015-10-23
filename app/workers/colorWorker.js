'use strict';

var pako = require('pako.inflate.min');

(function(){

    var imageData = null;

    function init() {
        addEventListener('message', function (event) {
            switch (event.data.message) {
            case "setImageData":
                imageData = event.data.imageData;
                break;
            case "processImageData":
                processImageData(event.data.imageBuffer);
                break;
            }
        });
    }

    function processImageData(compressedData) {
        var imageBuffer = pako.inflate(atob(compressedData));
        var pixelArray = imageData.data;
        var newPixelData = new Uint8Array(imageBuffer);
        var imageDataSize = imageData.data.length;
        for (var i = 0; i < imageDataSize; i++) {
            imageData.data[i] = newPixelData[i];
        }
      this.postMessage({ "message": "imageReady", "imageData": imageData });
    }

    init();
})();
