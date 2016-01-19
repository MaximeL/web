'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.audionodeSelector
 * @description
 * # audionodeSelector
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('audionodeSelector', function (inputnode, outputnode) {
    // Service logic
    var selectNode = function(type) {
      if(type === 'input')
        return inputnode;
      if(type === 'output')
        return outputnode;
      return null;
    };

    return {
      getAudionode: function(type) {
        return selectNode(type);
      }
    };
  });
