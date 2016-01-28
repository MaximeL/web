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

      this.lowshelf = audioContext.createBiquadFilter();
      this.lowshelf.type = 'peaking';

      this.input.connect(this.lowshelf);
      this.lowshelf.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.lowshelf.frequency.value = 440;
      this.lowshelf.Q.value = 0;
      this.lowshelf.gain.value = 0;
    };

    // Public API here
    return Peaking;
  });
