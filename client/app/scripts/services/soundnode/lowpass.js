'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.LowPass
 * @description
 * # LowPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('LowPass', function () {
    // Service logic
    function Gain() {}
    Gain.prototype = Object.create(AbstractSoundnode.prototype);

    Gain.prototype.type = 'gain';

    Gain.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.gain = audioContext.createGain();

      this.input.connect(this.gain);
      this.gain.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;
      this.gain.gain.value = 1;
    };

    Gain.prototype.setVolume = function (val) {
      //for the moment, no control over val but after we must keep it between 0 and 1
      this.gain.gain.value = val;
    };

    // Public API here
    return Gain;
  });
