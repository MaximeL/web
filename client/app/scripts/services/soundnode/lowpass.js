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

      if(typeof this.value.frequency === 'undefined' && this.value.frequency === null) {
        this.lowpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.lowpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.lowpass.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.lowpass.Q.value = this.value.Q;
      }
    };
    LowPass.prototype.setValue = function() {
      this.value.frequency = this.lowpass.frequency.value;
      this.value.gain = this.lowpass.gain.value;
    };

    // Public API here
    return LowPass;
  });
