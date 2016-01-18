'use strict';

/**
 * Basic sound node that does nothing
 * @ngdoc service
 * @name webClientSideApp.SoundNode
 * @description
 * # SoundNode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('soundNode', function () {

    var soundnode = {};

    var init = function(audioContext) {
      soundnode.input = audioContext.createGain();
      soundnode.output = audioContext.createGain();

      soundnode.input.connect(soundnode.output);

      soundnode.connect = function(target) {
        soundnode.output.connect(target);
      };
      soundnode.disconnect = function() {
        soundnode.output.disconnect();
      };
      return soundnode;
    };

    // Public API here
    return {
      create: function (audioContext) {
        return init(audioContext);
      }
    };
  });
