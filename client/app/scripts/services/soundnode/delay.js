'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Delay
 * @description
 * # Delay
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Delay', function (AbstractSoundnode) {
    // Service logic
    function Delay() {}
    Delay.prototype = Object.create(AbstractSoundnode.prototype);

    Delay.prototype.type = 'delay';

    Delay.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.delay = audioContext.createDelay();

      this.input.connect(this.delay);
      this.delay.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.delay.delayTime.value = 0;
    };

    // Public API here
    return Delay;
  });
