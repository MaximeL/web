'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.AllPass
 * @description
 * # AllPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('AllPass', function (AbstractSoundnode) {
    // Service logic
    function AllPass() {}
    AllPass.prototype = Object.create(AbstractSoundnode.prototype);

    AllPass.prototype.type = 'allpass';

    AllPass.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.allpass = audioContext.createBiquadFilter();
      this.allpass.type = 'allpass';

      this.input.connect(this.allpass);
      this.allpass.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      if(typeof this.value.frequency === 'undefined' && this.value.frequency === null) {
        this.allpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.allpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.allpass.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.allpass.Q.value = this.value.Q;
      }
    };
    AllPass.prototype.setValue = function() {
      this.value.frequency = this.allpass.frequency.value;
      this.value.Q = this.allpass.Q.value;
    };

    // Public API here
    return AllPass;
  });
