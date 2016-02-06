'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.compressor
 * @description
 * # compressor
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Compressor', function ($log, AbstractSoundnode) {
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

    // Public API here
    return Compressor;
  });
