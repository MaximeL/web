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
    var input = {
      id: 0,
      type: 'input',
      posx: null,
      posy: null,
      value: null,
      suivants: []
    };
    var output = {
      id: 1,
      type: 'output',
      posx: null,
      posy: null,
      value: null,
      precedents: []
    };

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
      jsPlumb.detachAllConnections(''+id);
      while(this.storage[id].precedents.length !== 0) {
        this.disconnect(this.storage[id].precedents[0], id);
      }
      while(this.storage[id].suivants.length !== 0) {
        this.disconnect(id, this.storage[id].suivants[0]);
      }
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
      this.storage[inputId].disconnect(this.storage[outputId]);
      this.storage[outputId].isDisconnected(this.storage[inputId]);
      //on reconnecte les autres nodes.
      this.restaureConnections(inputId);
    };
    NodeStorage.prototype.restaureConnections = function(id) {
      for(var i = 0; i < this.storage[id].suivants.length; i++) {
        //en gros c'est input.connect(output)
        this.storage[id].output.connect(this.storage[this.storage[id].suivants[i]].input);
      }
    };
    NodeStorage.prototype.setup = function(backup) {
      this.addNode(input);
      this.addNode(output);
      for(var i = 0; i < backup.length; i++) {
        if(typeof backup[i] !== 'undefined') {
          this.addNode(angular.fromJson(backup[i]));
        }
      }
    };
    NodeStorage.prototype.backup = function() {
      var backup = [];
      for(var i = 2; i < this.storage.length; i++) {
        if(typeof this.storage[i] !== 'undefined') {
          backup.push(angular.toJson(this.storage[i], false));
        }
      }
      return backup;
    };

    // Public API here
    return NodeStorage;
  });
