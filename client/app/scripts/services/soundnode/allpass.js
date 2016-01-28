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

      this.allpass.frequency.value = 440;
      this.allpass.Q.value = 0;
    };

    // Public API here
    return AllPass;
  });
