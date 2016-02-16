let pako = require('pako.inflate.min');

let worker = {
  imageData: undefined,

  init: function() {
    addEventListener('message', function (event) {
      switch (event.data.message) {
      case 'estimated':
        this.imageData = event.data.imageData;
        break;
      case 'processImageData':
        this.process(event.data.imageBuffer);
        break;
      }
    });
  },

  process: function(compressed) {
    let imageBuffer = pako.inflate(window.atob(compressed));
    let imageDataSize = this.imageData.data.length;
    let newPixelData = new Uint8Array(imageBuffer);
    for (let i = 0; i < imageDataSize; i++) {
      this.imageData.data[i] = newPixelData[i];
    }
    this.postMessage({ 'message': 'imageReady', 'this.imageData': this.imageData });
  }
};

worker.init();

module.exports = worker;
