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

      this.convolver = audioContext.createConvolver();

      var soundRequest = new XMLHttpRequest();
      soundRequest.open('GET', config.apiURL+ config.samples +'irHall', true);
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
    Convolver.prototype.getInput = function() {
      return this.convolver;
    };
    Convolver.prototype.getOutput = function() {
      return this.convolver;
    };

    // Public API here
    return Convolver;
  });
