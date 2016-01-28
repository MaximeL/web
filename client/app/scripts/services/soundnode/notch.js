'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Notch
 * @description
 * # Notch
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Notch', function (AbstractSoundnode) {
    // Service logic
    function Notch() {}
    Notch.prototype = Object.create(AbstractSoundnode.prototype);

    Notch.prototype.type = 'notch';

    Notch.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.notch = audioContext.createBiquadFilter();
      this.notch.type = 'notch';

      this.input.connect(this.notch);
      this.notch.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.notch.frequency.value = 440;
      this.notch.Q.value = 0;
    };

    // Public API here
    return Notch;
  });
