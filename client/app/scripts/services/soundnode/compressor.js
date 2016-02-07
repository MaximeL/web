'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.compressor
 * @description
 * # compressor
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Compressor', function ($log, AbstractSoundnode, NodeParameter) {
    // Service logic
    function Compressor() {}
    Compressor.prototype = Object.create(AbstractSoundnode.prototype);

    Compressor.prototype.type = 'compressor';

    Compressor.prototype.initNode = function(audioContext) {
      var self = this;

      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.compressor = audioContext.createDynamicsCompressor();

      this.input.connect(this.compressor);
      this.compressor.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'threshold';
      this.parameters[0].min = -100;
      this.parameters[0].max = 0;
      this.parameters[0].step = 1;

      this.parameters[1] = new NodeParameter();
      this.parameters[1].name = 'knee';
      this.parameters[1].min = 0;
      this.parameters[1].max = 40;
      this.parameters[1].step = 0.1;

      this.parameters[2] = new NodeParameter();
      this.parameters[2].name = 'ratio';
      this.parameters[2].min = 1;
      this.parameters[2].max = 20;
      this.parameters[2].step = 1;

      this.parameters[3] = new NodeParameter();
      this.parameters[3].name = 'reduction';
      this.parameters[3].min = -20;
      this.parameters[3].max = 0;
      this.parameters[3].step = 0.1;

      this.parameters[4] = new NodeParameter();
      this.parameters[4].name = 'attack';
      this.parameters[4].min = 0;
      this.parameters[4].max = 1;
      this.parameters[4].step = 0.01;

      this.parameters[5] = new NodeParameter();
      this.parameters[5].name = 'release';
      this.parameters[5].min = 0;
      this.parameters[5].max = 1;
      this.parameters[5].step = 0.01;

      if(typeof this.value.threshold === 'undefined' || this.value.threshold === null) {
        this.compressor.threshold.value = -24;
        this.value.threshold = -24;
      } else {
        this.compressor.threshold.value = this.value.threshold;
      }
      if(typeof this.value.knee === 'undefined' || this.value.knee === null) {
        this.compressor.knee.value = 30;
        this.value.knee = 30;
      } else {
        this.compressor.knee.value = this.value.knee;
      }
      if(typeof this.value.ratio === 'undefined' || this.value.ratio === null) {
        this.compressor.ratio.value = 12;
        this.value.ratio = 12;
      } else {
        this.compressor.ratio.value = this.value.ratio;
      }
      if(typeof this.value.reduction === 'undefined' || this.value.reduction === null) {
        this.compressor.reduction.value = -20;
        this.value.reduction = -20;
      } else {
        this.compressor.reduction.value = this.value.reduction;
      }
      if(typeof this.value.attack === 'undefined' || this.value.attack === null) {
        this.compressor.attack.value = 0.003;
        this.value.attack = 0.003;
      } else {
        this.compressor.attack.value = this.value.attack;
      }
      if(typeof this.value.release === 'undefined' || this.value.release === null) {
        this.compressor.release.value = 0.25;
        this.value.release = 0.25;
      } else {
        this.compressor.release.value = this.value.release;
      }
    };
    Compressor.prototype.setValue = function() {
      this.value.threshold = this.compressor.threshold.value;
      this.value.knee = this.compressor.knee.value;
      this.value.ratio = this.compressor.ratio.value;
      this.value.reduction = this.compressor.reduction.value;
      this.value.attack = this.compressor.attack.value;
      this.value.release = this.compressor.release.value;
    };
    Compressor.prototype.setParameters = function(paramName) {
      this.compressor[paramName].value = this.value[paramName];
    };

    // Public API here
    return Compressor;
  });
