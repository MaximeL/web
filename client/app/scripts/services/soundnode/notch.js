'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Notch
 * @description
 * # Notch
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Notch', function (AbstractSoundnode, NodeParameter) {
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
    Notch.prototype.setParameters = function(paramName) {
      this.notch[paramName].value = this.value[paramName];
    };

    // Public API here
    return Notch;
  });
