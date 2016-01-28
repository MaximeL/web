'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.LowPass
 * @description
 * # LowPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('LowPass', function (AbstractSoundnode) {
    // Service logic
    function LowPass() {}
    LowPass.prototype = Object.create(AbstractSoundnode.prototype);

    LowPass.prototype.type = 'lowpass';

    LowPass.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.lowpass = audioContext.createBiquadFilter();
      this.lowpass.type = 'lowpass';

      this.input.connect(this.lowpass);
      this.lowpass.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.lowpass.frequency.value = 440;
      this.lowpass.Q.value = 0;
    };

    // Public API here
    return LowPass;
  });
