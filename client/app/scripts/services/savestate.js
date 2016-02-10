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
      debounce: 10,
      time: new Date().getTime(),
      nodestorages : {},
      resultNodestorage: new NodeStorage(),

      saveState: function() {
        $log.debug('saveState');
        sessionStorage.nodestorages = angular.toJson(SaveState.nodestorages);
        $log.debug(angular.toJson(SaveState.nodestorages));
        SaveState.sendSave();
      },

      restoreState: function() {
        SaveState.nodestorages = angular.fromJson(sessionStorage.nodestorages);
      },

      getNodeStorage: function(id) {
        SaveState.restoreState();
        if(typeof SaveState.nodestorages[id] === 'undefined' || SaveState.nodestorages[id] === null) {
          $log.debug('returning null in getNodeStorage');
          return null;
        } else {
          $log.debug('returning a nodestorage');
          $log.debug(SaveState.nodestorages[id]);
          SaveState.resultNodestorage.nextId = SaveState.nodestorages[id].nextId;
          SaveState.resultNodestorage.storage = SaveState.nodestorages[id].storage;
          return SaveState.resultNodestorage;
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

      wipe: function() {
        sessionStorage.nodestorages = "";
      },

      sendSave: function (id) {
        $log.info('saving');
        $log.debug(SaveState.nodestorages);
        var now = new Date().getTime();
        if(SaveState.debounce < (now - SaveState.time) &&
          typeof SaveState.nodestorages[id] !== 'undefined' &&
          SaveState.nodestorages[id] !== null) {
          $log.info('saving now');
          SaveState.time = new Date().getTime();
          var body = {};
          SaveState.resultNodestorage.nextId = SaveState.nodestorages[id].nextId;
          SaveState.resultNodestorage.storage = SaveState.nodestorages[id].storage;
          body.effects = SaveState.resultNodestorage.backup();
          wsEffects.put(body, id);
        } else {
          $log.info('not saving now');
        }
      },

      forceSave: function(id) {
        SaveState.time = new Date();
        var body = {};
        body.effects = SaveState.nodestorages[id].backup();
        wsEffects.put(body, id);
      }
    };

    // Public API here
    return SaveState;

  });
