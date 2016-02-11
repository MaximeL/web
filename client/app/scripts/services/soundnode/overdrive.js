'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Distorsion
 * @description
 * # Distorsion
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Overdrive', function ($log, AbstractSoundnode, NodeParameter) {
    // Service logic
    function Overdrive() {}
    Overdrive.prototype = Object.create(AbstractSoundnode.prototype);

    Overdrive.prototype.type = 'overdrive';

    Overdrive.prototype.initNode = function(audioContext) {

      this.overdrive = audioContext.createWaveShaper();

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'curveValue';
      this.parameters[0].min = 200;
      this.parameters[0].max = 44100;
      this.parameters[0].step = 1;

      if(typeof this.value.curveValue === 'undefined' || this.value.curveValue === null) {
        this.curveValue = 22050;
        this.value.curveValue = 22050;
      } else {
        this.curveValue = this.value.curveValue;
      }
      this.overdrive.curve = this.makeOverdriveCurve(this.curveValue);
      this.overdrive.oversample = '4x';
    };
    Overdrive.prototype.setValue = function() {
      this.value.curveValue = this.curveValue;
    };

    Overdrive.prototype.setOverdriveCurve = function() {
      this.overdrive.curve = this.makeOverdriveCurve(this.curveValue);
    };

    Overdrive.prototype.makeOverdriveCurve = function (amount) {
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
      /*var curve = new Float32Array(amount);
      var deg = Math.PI / 180;

      for (var i=0;i<amount;i++) {
        var x = i * 2 / amount - 1;
        curve[i] = (3 + 10) * x * 20 * deg / (Math.PI + 10 * Math.abs(x));
      }
      return curve;*/
    };
    Overdrive.prototype.setParameters = function(paramName) {
      this.curveValue = this.value.curveValue;
      this.overdrive.curve = this.makeOverdriveCurve(this.value.curveValue);
    };
    Overdrive.prototype.getInput = function() {
      return this.overdrive;
    };
    Overdrive.prototype.getOutput = function() {
      return this.overdrive;
    };

    // Public API here
    return Overdrive;
  });
