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
  .factory('Outputnode', function () {
    // Service logic
    var soundnode = {};

    var init = function(audioContext) {
      soundnode.input = audioContext.destination;
      soundnode.template = '<div class="soundnode output">Output</div>';

      return soundnode;
    };

    // Public API here
    return {
      create: function (audioContext) {
        return init(audioContext);
      }
    };
  });
