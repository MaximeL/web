'use strict';

/**
 * Node that output the connected sound to the default sound of the navigator
 * @ngdoc service
 * @name webClientSideApp.Outputnode
 * @description
 * # Outputnode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Outputnode', function ($log, AbstractSoundnode) {
    // Service logic
    function Outputnode() {}
    Outputnode.prototype = Object.create(AbstractSoundnode.prototype);

    Outputnode.prototype.type = 'output';

    Outputnode.prototype.initNode = function(audioContext) {
      this.input = audioContext.destination;
    };
    Outputnode.prototype.getInput = function() {
      return this.input;
    };
    Outputnode.prototype.getOutput = function() {
      return null;
    };

    // Public API here
    return Outputnode;
  });
