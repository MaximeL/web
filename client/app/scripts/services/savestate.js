'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.saveState
 * @description
 * # saveState
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('saveState', function ($log, wsEffects, NodeStorage) {
    // Service logic
    var debounce = 60000;
    var time;

    var save = function() {
      $log.info('in save');
      $log.debug(NodeStorage.get().storage);
    };

    // Public API here
    return {
      save: function () {
        return save();
      }
    };
  });
