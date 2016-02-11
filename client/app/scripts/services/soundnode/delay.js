'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.Delay
 * @description
 * # Delay
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Delay', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function Delay() {}
    Delay.prototype = Object.create(AbstractSoundnode.prototype);

    Delay.prototype.type = 'delay';

    Delay.prototype.initNode = function(audioContext) {

      this.input = audioContext.createGain();
      this.feedback = audioContext.createGain();
      this.delay = audioContext.createDelay();
      this.output = audioContext.createGain();

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'delayTime';
      this.parameters[0].min = 0;
      this.parameters[0].max = 1;
      this.parameters[0].step = 0.01;

      this.parameters[1] = new NodeParameter();
      this.parameters[1].name = 'feedback';
      this.parameters[1].min = 0;
      this.parameters[1].max = 1;
      this.parameters[1].step = 0.01;

      if(typeof this.value.delayTime === 'undefined' || this.value.delayTime === null) {
        this.delay.delayTime.value = 0.3;
        this.value.delayTime = 0.3;
      } else {
        this.delay.delayTime.value = this.value.delayTime;
      }
      if(typeof this.value.feedback === 'undefined' || this.value.feedback === null) {
        this.feedback.gain.value = 0.2;
        this.value.feedback = 0.2;
      } else {
        this.feedback.gain.value = this.value.feedback;
      }

      // dry path
      this.input.connect(this.output);
      // wet path
      this.input.connect(this.delay);
      // feedback loop
      this.delay.connect(this.feedback);
      this.feedback.connect(this.delay);
      this.feedback.connect(this.output);
    };
    Delay.prototype.setValue = function() {
      this.value.delayTime = this.delay.delayTime.value;
    };
    Delay.prototype.setParameters = function(paramName) {
      if(paramName === 'feedback') {
        this.feedback.gain.value = this.value.feedback;
      } else {
        this.delay[paramName].value = this.value[paramName];
      }
    };
    Delay.prototype.getInput = function() {
      return this.input;
    };
    Delay.prototype.getOutput = function() {
      return this.output;
    };

    // Public API here
    return Delay;
  });
