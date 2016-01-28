'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.NodeStorage
 * @description
 * # NodeStorage
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('NodeStorage', function ($log, audionodeSelector, audiocontext) {
    // Service logic
    function NodeStorage() {}

    NodeStorage.prototype.storage = [];

    NodeStorage.prototype.addNode = function(node) {
      var soundnode = audionodeSelector.getAudionode(node.type);
      soundnode.init(audiocontext.get(),
        node.id,
        node.type,
        node.posx,
        node.posy,
        node.value,
        node.precedent,
        node.suivant);
      this.storage[node.id] = soundnode;
    };
    NodeStorage.prototype.removeNode = function(id) {
      this.storage[id] = null;
    };
    NodeStorage.prototype.connect = function(inputId, outputId) {
      this.storage[inputId].connect(this.storage[outputId]);
      this.storage[outputId].isConnected(this.storage[inputId]);
    };
    NodeStorage.prototype.disconnect = function(inputId, outputId) {
      this.storage[inputId].disconnect();
      this.storage[outputId].isDisconnected()
    };

    // Public API here
    return NodeStorage;
  });
