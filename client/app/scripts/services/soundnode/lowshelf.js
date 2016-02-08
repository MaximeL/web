'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.LowShelf
 * @description
 * # LowShelf
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('LowShelf', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function LowShelf() {}
    LowShelf.prototype = Object.create(AbstractSoundnode.prototype);

    LowShelf.prototype.type = 'lowshelf';

    LowShelf.prototype.initNode = function(audioContext) {

      this.lowshelf = audioContext.createBiquadFilter();
      this.lowshelf.type = 'lowshelf';

      this.parameters[0] = new NodeParameter();
      this.parameters[0].name = 'frequency';
      this.parameters[0].min = 20;
      this.parameters[0].max = 20000;
      this.parameters[0].step = 1;

      this.parameters[1] = new NodeParameter();
      this.parameters[1].name = 'gain';
      this.parameters[1].min = -40;
      this.parameters[1].max = 40;
      this.parameters[1].step = 1;

      if(typeof this.value.frequency === 'undefined' || this.value.frequency === null) {
        this.lowshelf.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.lowshelf.frequency.value = this.value.frequency;
      }
      if(typeof this.value.gain === 'undefined' || this.value.gain === null) {
        this.lowshelf.gain.value = 0;
        this.value.gain = 0;
      } else {
        this.lowshelf.gain.value = this.value.gain;
      }
    };
    LowShelf.prototype.setValue = function() {
      this.value.frequency = this.lowshelf.frequency.value;
      this.value.gain = this.lowshelf.gain.value;
    };
    LowShelf.prototype.setParameters = function(paramName) {
      this.lowshelf[paramName].value = this.value[paramName];
    };
    LowShelf.prototype.getInput = function() {
      return this.lowshelf;
    };
    LowShelf.prototype.getOutput = function() {
      return this.lowshelf;
    };

    // Public API here
    return LowShelf;
  });
