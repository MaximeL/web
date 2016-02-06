'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Distorsion
 * @description
 * # Distorsion
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Distorsion', function ($log, AbstractSoundnode) {
    // Service logic
    function Distorsion() {}
    Distorsion.prototype = Object.create(AbstractSoundnode.prototype);

    Distorsion.prototype.type = 'distorsion';

    Distorsion.prototype.initNode = function(audioContext) {
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();

      this.distorsion = audioContext.createWaveShaper();

      this.input.connect(this.distorsion);
      this.distorsion.connect(this.output);

      this.output.gain.value = 1;
      this.input.gain.value = 1;

      if(typeof this.value.curveValue === 'undefined' || this.value.curveValue === null) {
        this.curveValue = 400;
        this.value.curveValue = 400;
      } else {
        this.curveValue = this.value.curveValue;
      }
      this.distorsion.curve = this.makeDistortionCurve(this.curveValue);
      this.distorsion.oversample = '4x';
    };
    Distorsion.prototype.setValue = function() {
      this.value.curveValue = this.curveValue;
    };

    Distorsion.prototype.setDistortionCurve = function() {
      $log.debug('in set disto');
      $log.debug(this.curveValue);
      this.distorsion.curve = this.makeDistortionCurve(this.curveValue);
    };

    Distorsion.prototype.makeDistortionCurve = function (amount) {
      var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
      for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
      }
      return curve;
    };

    // Public API here
    return Distorsion;
  });
