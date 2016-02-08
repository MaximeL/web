'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.HighShelf
 * @description
 * # HighShelf
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('HighShelf', function (AbstractSoundnode, NodeParameter) {
    // Service logic
    function HighShelf() {}
    HighShelf.prototype = Object.create(AbstractSoundnode.prototype);

    HighShelf.prototype.type = 'highshelf';

    HighShelf.prototype.initNode = function(audioContext) {

      this.highshelf = audioContext.createBiquadFilter();
      this.highshelf.type = 'highshelf';

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
        this.highshelf.frequency.value = 440;
        this.value.frequency = 440;
      } else {
        this.highshelf.frequency.value = this.value.frequency;
      }
      if(typeof this.value.gain === 'undefined' || this.value.gain === null) {
        this.highshelf.gain.value = 0;
        this.value.gain = 0;
      } else {
        this.highshelf.gain.value = this.value.gain;
      }
    };
    HighShelf.prototype.setValue = function() {
      this.value.frequency = this.highshelf.frequency.value;
      this.value.gain = this.highshelf.gain.value;
    };
    HighShelf.prototype.setParameters = function(paramName) {
      this.highshelf[paramName].value = this.value[paramName];
    };
    HighShelf.prototype.getInput = function() {
      return this.highshelf;
    };
    HighShelf.prototype.getOutput = function() {
      return this.highshelf;
    };

    // Public API here
    return HighShelf;
  });
