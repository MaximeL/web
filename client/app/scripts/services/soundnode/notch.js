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

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.notch.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.notch.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.notch.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.notch.Q.value = this.value.Q;
      }
    };
    Notch.prototype.setValue = function() {
      this.value.frequency = this.notch.frequency.value;
      this.value.Q = this.notch.Q.value;
    };

    // Public API here
    return Notch;
  });
