'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.HighShelf
 * @description
 * # HighShelf
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('HighShelf', function (AbstractSoundnode) {
    // Service logic
    function HighShelf() {}
    HighShelf.prototype = Object.create(AbstractSoundnode.prototype);

    HighShelf.prototype.type = 'highshelf';

    HighShelf.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.highshelf = audioContext.createBiquadFilter();
      this.highshelf.type = 'highshelf';

      this.input.connect(this.highshelf);
      this.highshelf.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.highshelf.frequency.value = 440;
      this.highshelf.gain.value = 0;
    };

    // Public API here
    return HighShelf;
  });
