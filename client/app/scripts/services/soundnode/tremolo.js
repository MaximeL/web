'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Tremolo
 * @description
 * # Tremolo
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Tremolo', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function Tremolo() {}
    Tremolo.prototype = Object.create(AbstractSoundnode.prototype);

    Tremolo.prototype.type = 'tremolo';

    Tremolo.prototype.initNode = function(audioContext) {

      this.tremolo = audioContext.createGain();
      this.tremolo.gain.value = 0;

      this.lfo = audioContext.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.start(audioContext.currentTime);

      this.shaper = audioContext.createWaveShaper();
      this.shaper.curve = new Float32Array([0, 1]);

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'frequency';
      this.parameters[0].min = 0;
      this.parameters[0].max = 20;
      this.parameters[0].step = 0.1;

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.lfo.frequency.value = 2;
        this.value.frequency = 2;
      } else {
        this.lfo.frequency.value = this.value.frequency;
      }

      this.shaper.connect(this.tremolo.gain);
      this.lfo.connect(this.shaper);
    };
    Tremolo.prototype.setValue = function() {
      this.value.frequency = this.lfo.frequency.value;
    };
    Tremolo.prototype.setParameters = function(paramName) {
      this.lfo[paramName].value = this.value[paramName];
    };
    Tremolo.prototype.getInput = function() {
      return this.tremolo;
    };
    Tremolo.prototype.getOutput = function() {
      return this.tremolo;
    };

    // Public API here
    return Tremolo;
  });
