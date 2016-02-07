'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.NodeStorage
 * @description
 * # NodeStorage
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('NodeStorage', function ($rootScope, $log, audionodeSelector, audiocontext) {
    // Service logic

    var input = {
      id: 0,
      name: 'input',
      type: 'input',
      posx: null,
      posy: null,
      value: null,
      suivants: []
    };
    var output = {
      id: 1,
      name: 'output',
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
      $log.info('Storing node of type : ' + node.type);
      if(node.id === null || typeof node.id === 'undefined')
        node.id = this.nextId;
      if(node.id >= this.nextId)
        this.nextId = node.id;
      this.nextId++;
      var soundnode = audionodeSelector.getAudionode(node.type);
      soundnode.init(audiocontext.get(),
        node.id,
        node.name,
        node.type,
        node.posx,
        node.posy,
        node.value,
        node.precedents,
        node.suivants);
      this.storage[node.id] = soundnode;
      return node.id;
    };
    NodeStorage.prototype.removeNode = function(id) {
      $log.info("deleting node with id : "+id);
      $log.info(this.storage[id]);
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
      this.storage[id].output.disconnect();
      for(var i = 0; i < this.storage[id].suivants.length; i++) {
        //en gros c'est input.connect(output)
        this.storage[id].output.connect(this.storage[this.storage[id].suivants[i]].input);
      }
    };
    NodeStorage.prototype.setupPedal = function(backup) {
      this.addNode(input);
      this.addNode(output);
      for(var i = 0; i < backup.length; i++) {
        if(typeof backup[i] !== 'undefined') {
          this.addNode(angular.fromJson(backup[i].data));
        }
      }
    };
    NodeStorage.prototype.backup = function() {
      var backup = [];
      for(var i = 2; i < this.storage.length; i++) {
        if(typeof this.storage[i] !== 'undefined') {
          this.storage[i].setValue();
          backup.push({ data: angular.toJson(this.storage[i], false) });
        }
      }
      return backup;
    };
    NodeStorage.prototype.redoConnections = function() {
      jsPlumb.detachEveryConnection();
      //Going through the node from BD
      for(var idNode = 2; idNode < this.storage.length; idNode++) {
        //check for undefined
        if(typeof this.storage[idNode] !== 'undefined' && this.storage[idNode] !== null) {
          //If node 0 (input) is in precedents, link it
          if(this.storage[idNode].precedents.indexOf(0) !== -1) {
            //this trigger the connection and its event
            jsPlumb.connect({
              source: angular.element.find('#0')[0].nodeOutput,
              target: angular.element.find('#' + idNode)[0].nodeInput
            });
            //Has the event add 0 in precedent we must remove it
            this.storage[idNode].precedents.splice(this.storage[idNode].precedents.indexOf(0), 1);
          }
          //Connection of all element, taking suivants
          for (var idNext = 0; idNext < this.storage[idNode].suivants.length; idNext++) {
            if(typeof this.storage[idNode].suivants[idNext] !== 'undefined' && this.storage[idNode].suivants[idNext] !== null) {
              jsPlumb.connect({
                source: angular.element.find('#' + idNode)[0].nodeOutput,
                target: angular.element.find('#' + this.storage[idNode].suivants[idNext])[0].nodeInput
              });
              this.storage[idNode].suivants.splice(this.storage[idNode].suivants.indexOf(this.storage[idNode].suivants[idNext]), 1);
              if(this.storage[idNode].suivants[idNext] !== 1)
                this.storage[this.storage[idNode].suivants[idNext]].precedents.splice(this.storage[this.storage[idNode].suivants[idNext]].precedents.indexOf(idNode), 1);
            }
          }
        }
      }
    };
    //weird name... It's for restoring the connection of input after the user has share the mic.
    NodeStorage.prototype.restoreInputPlaySound = function() {
      this.storage[0].playSound.disconnect();
      for(var i = 0; i < this.storage[0].suivants.length; i++) {
        //en gros c'est input.connect(output)
        this.storage[0].playSound.connect(this.storage[this.storage[0].suivants[i]].input);
      }
    };
    NodeStorage.prototype.wipe = function() {
      this.storage = [];
    };

    var get = function() {
      if(typeof $rootScope.nodeStorage === 'undefined' || $rootScope.nodeStorage === null) {
        $rootScope.nodeStorage = new NodeStorage();
        return $rootScope.nodeStorage;
      } else {
        return $rootScope.nodeStorage;
      }
    };

    // Public API here
    return {
      get: function() {
        return get();
      }
    };
  });
