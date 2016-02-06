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
      this.highpass.type = 'highpass';

      this.input.connect(this.highpass);
      this.highpass.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.highpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.highpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.highpass.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.highpass.Q.value = this.value.Q;
      }
    };
    HighPass.prototype.setValue = function() {
      this.value.frequency = this.highpass.frequency.value;
      this.value.Q = this.highpass.Q.value;
    };

    // Public API here
    return HighPass;
  });
