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

      if(typeof this.value.frequency === 'undefined' && this.value.frequency === null) {
        this.highshelf.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.highshelf.frequency.value = this.value.frequency;
      }
      if(typeof this.value.gain === 'undefined' || this.value.gain === null) {
        this.highshelf.gain.value = 0;
        this.value.gain = 0;
      } else {
        this.highshelf.gain.value = this.value.gain;
      }
    };
    HighShelf.prototype.setValue = function() {
      this.value.frequency = this.highshelf.frequency.value;
      this.value.gain = this.highshelf.gain.value;
    };

    // Public API here
    return HighShelf;
  });
