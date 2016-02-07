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

    var save = function(id) {
      $log.info('saving');
      var body = {};
      body.effects = NodeStorage.get().backup();
      wsEffects.put(body, id);
    };

    // Public API here
    return {
      save: function (id) {
        return save(id);
      }
    };
  });
