'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.BandPass
 * @description
 * # BandPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('BandPass', function (AbstractSoundnode) {
    // Service logic
    function BandPass() {}
    BandPass.prototype = Object.create(AbstractSoundnode.prototype);

    BandPass.prototype.type = 'bandpass';

    BandPass.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.bandpass = audioContext.createBiquadFilter();
      this.bandpass.type = 'bandpass';

      this.input.connect(this.bandpass);
      this.bandpass.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.bandpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.bandpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.bandpass.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.bandpass.Q.value = this.value.Q;
      }
    };
    BandPass.prototype.setValue = function() {
      this.value.frequency = this.bandpass.frequency.value;
      this.value.Q = this.bandpass.Q.value;
    };

    // Public API here
    return BandPass;
  });
