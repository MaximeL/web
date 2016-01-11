'use strict';

/**
 * Input node that take a recording device as input
 * @ngdoc service
 * @name webClientSideApp.Inputnode
 * @description
 * # Inputnode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Inputnode', function () {
    // Service logic
    var soundnode = {};

    var init = function(audioContext, stream) {
      soundnode.input = audioContext.createMediaStreamSource(stream);

      soundnode.connect = function(target) {
        input.connect(target);
      };
      return soundnode;
    };

    // Public API here
    return {
      create: function (audioContext, stream) {
        return init(audioContext, stream);
      }
    };
  });
