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
  .factory('inputnode', function () {
    // Service logic
    var soundnode = {};

    var init = function(audioContext, stream) {
      soundnode.output = audioContext.createMediaStreamSource(stream);

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
      create: function (audioContext, stream) {
        return init(audioContext, stream);
      }
    };
  });
