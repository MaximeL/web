'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.LowShelf
 * @description
 * # LowShelf
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('LowShelf', function (AbstractSoundnode) {
    // Service logic
    function LowShelf() {}
    LowShelf.prototype = Object.create(AbstractSoundnode.prototype);

    LowShelf.prototype.type = 'lowshelf';

    LowShelf.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.lowshelf = audioContext.createBiquadFilter();
      this.lowshelf.type = 'lowshelf';

      this.input.connect(this.lowshelf);
      this.lowshelf.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.lowshelf.frequency.value = 440;
      this.lowshelf.gain.value = 0;
    };

    // Public API here
    return LowShelf;
  });
