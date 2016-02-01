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

    NodeStorage.prototype.nextId = 0;

    NodeStorage.prototype.addNode = function(node) {
      if(node.id === null || typeof node.id === 'undefined')
        node.id = this.nextId;
      if(node.id >= this.nextId)
        this.nextId = node.id;
      this.nextId++;
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
      return node.id;
    };
    NodeStorage.prototype.removeNode = function(id) {
      $log.info("deleting node with id : "+id);
      $log.debug(this.storage[id].posx);
      jsPlumb.detachAllConnections(''+id);
      var nodeElement = angular.element.find('#'+id)[0];
      jsPlumb.deleteEndpoint(nodeElement.nodeOutput);
      jsPlumb.deleteEndpoint(nodeElement.nodeInput);
      this.storage[id] = undefined;
    };
    NodeStorage.prototype.connect = function(inputId, outputId) {
      this.storage[inputId].connect(this.storage[outputId]);
      this.storage[outputId].isConnected(this.storage[inputId]);
    };
    NodeStorage.prototype.disconnect = function(inputId, outputId) {
      this.storage[inputId].disconnect();
      this.storage[outputId].isDisconnected()
    };
    NodeStorage.prototype.setup = function(backup) {
      for(var i = 0; i < backup.length; i++) {
        if(typeof backup[i] !== 'undefined') {
          this.addNode(backup[i]);
        }
      }
    };
    NodeStorage.prototype.backup = function() {
      var backup = [];
      for(var i = 0; i < this.storage.length; i++) {
        if(typeof this.storage[i] !== 'undefined') {
          backup.push(this.storage[i]);
        }
      }
      return backup;
    };

    // Public API here
    return NodeStorage;
  });
