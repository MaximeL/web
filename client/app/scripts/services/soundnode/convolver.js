'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Convolver
 * @description
 * # Convolver
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Convolver', function ($http, $log, AbstractSoundnode) {
    // Service logic
    function Convolver() {}
    Convolver.prototype = Object.create(AbstractSoundnode.prototype);

    Convolver.prototype.type = 'convolver';

    Convolver.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.convolver = audioContext.createConvolver();

      this.input.connect(this.convolver);
      this.convolver.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      /*$http.get()
      var ajaxRequest = new XMLHttpRequest();
      ajaxRequest.open('GET', 'concert-crowd.ogg', true);
      ajaxRequest.responseType = 'arraybuffer';

      ajaxRequest.onload = function() {
        var audioData = ajaxRequest.response;
        audioCtx.decodeAudioData(audioData, function(buffer) {
          concertHallBuffer = buffer;
          soundSource = audioCtx.createBufferSource();
          soundSource.buffer = concertHallBuffer;
        }, function(e){"Error with decoding audio data" + e.err});
      }*/

      //ajaxRequest.send();
    };

    // Public API here
    return Convolver;
  });
