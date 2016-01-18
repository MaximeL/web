'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.audiocontext
 * @description
 * # audiocontext
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('audiocontext', function ($rootScope, $log) {
    // Service logic
    var getAudioCtx = function() {
      if(typeof $rootScope.audioCtx === 'undefined' || $rootScope.audioCtx === null) {
        $log.debug('creating audioCtx');
        $rootScope.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        return $rootScope.audioCtx;
      } else {
        $log.debug('not creating audioCtx');
        return $rootScope.audioCtx;
      }
    };
    return {
      get: function() {
        return getAudioCtx();
      }
    };
  });
