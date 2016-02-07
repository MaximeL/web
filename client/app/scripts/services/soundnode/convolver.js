'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Convolver
 * @description
 * # Convolver
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Convolver', function ($http, $log, AbstractSoundnode, config) {
    // Service logic
    function Convolver() {}
    Convolver.prototype = Object.create(AbstractSoundnode.prototype);

    Convolver.prototype.type = 'convolver';

    Convolver.prototype.initNode = function(audioContext) {
      var self = this;

      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.convolver = audioContext.createConvolver();

      this.input.connect(this.convolver);
      this.convolver.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      var soundRequest = new XMLHttpRequest();
      soundRequest.open('GET', config.samplesURL+'irHall', true);
      soundRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
      soundRequest.setRequestHeader('Access-Control-Allow-Methods', 'ANY');
      soundRequest.responseType = "arraybuffer";
      soundRequest.onload = function() {
        var audioData = soundRequest.response;
        audioContext.decodeAudioData(audioData, function(decodedData) {
          self.convolver.buffer = decodedData;
        });
      };
      soundRequest.send();
    };

    // Public API here
    return Convolver;
  });
