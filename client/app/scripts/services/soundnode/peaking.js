'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Peaking
 * @description
 * # Peaking
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Peaking', function (AbstractSoundnode, NodeParameter) {
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

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'frequency';
      this.parameters[0].min = 20;
      this.parameters[0].max = 20000;
      this.parameters[0].step = 1;

      this.parameters[1] = new NodeParameter();
      this.parameters[1].name = 'Q';
      this.parameters[1].min = 1;
      this.parameters[1].max = 1000;
      this.parameters[1].step = 1;

      this.parameters[2] = new NodeParameter();
      this.parameters[2].name = 'gain';
      this.parameters[2].min = -40;
      this.parameters[2].max = 40;
      this.parameters[2].step = 1;

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.peaking.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.peaking.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.peaking.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.peaking.Q.value = this.value.Q;
      }
      if(typeof this.value.gain === 'undefined' || this.value.gain === null) {
        this.peaking.gain.value = 0;
        this.value.gain = 0;
      } else {
        this.peaking.gain.value = this.value.gain;
      }
    };
    Peaking.prototype.setValue = function() {
      this.value.frequency = this.peaking.frequency.value;
      this.value.Q = this.peaking.Q.value;
      this.value.gain = this.peaking.gain.value;
    };

    // Public API here
    return Peaking;
  });
