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

    var SaveState = {
      debounce: 60000,
      time: 0,
      nodestorages : {},

      saveState: function() {
        $log.debug('saveState');
        sessionStorage.nodestorages = angular.toJson(SaveState.nodestorages);
        $log.debug(angular.toJson(SaveState.nodestorages));
        //SaveState.sendSave();
      },

      restoreState: function() {
        SaveState.nodestorages = angular.fromJson(sessionStorage.nodestorages);
      },

      getNodeStorage: function(id) {
        //restoreState.restoreState()
        if(typeof SaveState.nodestorages[id] === 'undefined' || SaveState.nodestorages[id] === null) {
          $log.debug('returning null in getNodeStorage');
          return null;
        } else {
          $log.debug('returning a nodestorage');
          return SaveState.nodestorages[id];
        }
      },

      setNodeStorage: function(storage, id) {
        $log.debug('setnodestorage');
        $log.debug(storage);
        SaveState.nodestorages[id] = storage;
        SaveState.saveState();
      },

      newPedal: function(id) {
        $log.debug('newPedal');
        SaveState.nodestorages[id] = new NodeStorage();
        $log.debug('SaveState.nodestorages');
        $log.debug(SaveState.nodestorages);
        SaveState.saveState();
      },

      sendSave: function (id) {
        $log.info('saving');
        var now = new Date();
        if(SaveState.debounce < now - SaveState.time) {
          SaveState.time = new Date();
          var body = {};
          body.effects = SaveState.nodestorages[id].backup();
          wsEffects.put(body, id);
        }
      }
    };

    // Public API here
    return SaveState;

  });
