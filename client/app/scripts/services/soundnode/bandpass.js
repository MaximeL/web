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

      this.bandpass.frequency.value = 440;
      this.bandpass.Q.value = 0;
    };

    // Public API here
    return BandPass;
  });
