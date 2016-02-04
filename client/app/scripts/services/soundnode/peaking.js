'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Peaking
 * @description
 * # Peaking
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Peaking', function (AbstractSoundnode) {
    // Service logic
    function Peaking() {}
    Peaking.prototype = Object.create(AbstractSoundnode.prototype);

    Peaking.prototype.type = 'peaking';

    Peaking.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.peaking = audioContext.createBiquadFilter();
      this.peaking.type = 'peaking';

      this.input.connect(this.peaking);
      this.peaking.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.peaking.frequency.value = 440;
      this.peaking.Q.value = 0;
      this.peaking.gain.value = 0;
    };

    // Public API here
    return Peaking;
  });
