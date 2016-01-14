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
      soundnode.template = '<div class="soundnode">soundnode</div>';

      soundnode.connect = function(target) {
        output.connect(target);
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
