'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.BandPass
 * @description
 * # BandPass
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('BandPass', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function BandPass() {}
    BandPass.prototype = Object.create(AbstractSoundnode.prototype);

    BandPass.prototype.type = 'bandpass';

    BandPass.prototype.initNode = function(audioContext) {

      this.bandpass = audioContext.createBiquadFilter();
      this.bandpass.type = 'bandpass';

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
        this.bandpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.bandpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.bandpass.Q.value = 1;
        this.value.Q = 1;
      } else {
        this.bandpass.Q.value = this.value.Q;
      }
    };
    BandPass.prototype.setValue = function() {
      this.value.frequency = this.bandpass.frequency.value;
      this.value.Q = this.bandpass.Q.value;
    };
    BandPass.prototype.setParameters = function(paramName) {
      this.bandpass[paramName].value = this.value[paramName];
    };
    BandPass.prototype.getInput = function() {
      return this.bandpass;
    };
    BandPass.prototype.getOutput = function() {
      return this.bandpass;
    };

    // Public API here
    return BandPass;
  });
