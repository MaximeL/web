'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.SoundNode/Gain
 * @description
 * # SoundNode/Gain
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Gain', function ($log, AbstractSoundnode, NodeParameter) {
    // Service logic
    function Gain() {}
    Gain.prototype = Object.create(AbstractSoundnode.prototype);

    Gain.prototype.type = 'gain';

    Gain.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.gain = audioContext.createGain();

      this.input.connect(this.gain);
      this.gain.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'gain';
      this.parameters[0].min = 0;
      this.parameters[0].max = 1;
      this.parameters[0].step = 0.01;

      if(typeof this.value.gain === 'undefined'  || this.value.gain === null) {
        this.gain.gain.value = 1;
        this.value.gain = 1;
      } else {
        this.gain.gain.value = this.value.gain;
      }
    };
    Gain.prototype.setValue = function() {
      this.value.gain = this.gain.gain.value;
    };

    // Public API here
    return Gain;
  });
