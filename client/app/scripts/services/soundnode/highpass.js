'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.HighPass
 * @description
 * # HighPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('HighPass', function (AbstractSoundnode) {
    // Service logic
    function HighPass() {}
    HighPass.prototype = Object.create(AbstractSoundnode.prototype);

    HighPass.prototype.type = 'highpass';

    HighPass.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.highpass = audioContext.createBiquadFilter();
      this.highpass.type = 1;

      this.input.connect(this.highpass);
      this.highpass.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.highpass.frequency.value = 440;
      this.highpass.Q.value = 0;
    };

    // Public API here
    return HighPass;
  });
