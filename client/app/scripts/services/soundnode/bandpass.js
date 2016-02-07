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
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.bandpass = audioContext.createBiquadFilter();
      this.bandpass.type = 'bandpass';

      this.input.connect(this.bandpass);
      this.bandpass.connect(this.output);

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
        this.bandpass.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.bandpass.frequency.value = this.value.frequency;
      }
      if(typeof this.value.Q === 'undefined' || this.value.Q === null) {
        this.bandpass.Q.value = 0;
        this.value.Q = 0;
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

    // Public API here
    return BandPass;
  });
