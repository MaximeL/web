'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.HighPass
 * @description
 * # HighPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('HighPass', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function HighPass() {}
    HighPass.prototype = Object.create(AbstractSoundnode.prototype);

    HighPass.prototype.type = 'highpass';

    HighPass.prototype.initNode = function(audioContext) {

      this.highpass = audioContext.createBiquadFilter();
      this.highpass.type = 'highpass';

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
        this.highpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.highpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.highpass.Q.value = 0;
        this.value.Q = 0;
      } else {
        this.highpass.Q.value = this.value.Q;
      }
    };
    HighPass.prototype.setValue = function() {
      this.value.frequency = this.highpass.frequency.value;
      this.value.Q = this.highpass.Q.value;
    };
    HighPass.prototype.setParameters = function(paramName) {
      this.highpass[paramName].value = this.value[paramName];
    };
    HighPass.prototype.getInput = function() {
      return this.highpass;
    };
    HighPass.prototype.getOutput = function() {
      return this.highpass;
    };

    // Public API here
    return HighPass;
  });
