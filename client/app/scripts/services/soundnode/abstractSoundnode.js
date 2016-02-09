'use strict';

/**
 * Basic sound node that does nothing
 * @ngdoc service
 * @name webClientSideApp.SoundNode
 * @description
 * # SoundNode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('AbstractSoundnode', function ($log) {

    // Service logic
    function AbstractSoundnode() {}

    AbstractSoundnode.prototype.id = null;
    AbstractSoundnode.prototype.name = null;
    AbstractSoundnode.prototype.type = null;
    AbstractSoundnode.prototype.posx = null;
    AbstractSoundnode.prototype.posy =  null;
    AbstractSoundnode.prototype.precedents = [];
    AbstractSoundnode.prototype.suivants = [];
    AbstractSoundnode.prototype.value = [];
    AbstractSoundnode.prototype.parameters = [];

    AbstractSoundnode.prototype.initNode = function(audioContext) {
      //kind of exemple of what should be done here
      this.node = audioContext.createGain();
    };
    AbstractSoundnode.prototype.connect = function(output) {
      $log.debug('node '+this.type+' connection to ');
      $log.debug(output);
      this.getOutput().connect(output.getInput());
    };
    AbstractSoundnode.prototype.addSuivant = function(outputId) {
      if(this.suivants.indexOf(outputId) === -1) {
        this.suivants.push(outputId);
      }
      $log.debug(this.suivants);
    };
    AbstractSoundnode.prototype.isConnected = function (input) {
      $log.debug('node '+this.type+' isConnected');
      if(this.precedents.indexOf(input.id) === -1) {
        this.precedents.push(input.id);
      }
      $log.debug(this.precedents);
    };
    AbstractSoundnode.prototype.disconnect = function () {
      this.getOutput().disconnect();
    };
    AbstractSoundnode.prototype.removeSuivant = function (outputId) {
      this.suivants.splice(this.suivants.indexOf(outputId), 1);
    };
    AbstractSoundnode.prototype.isDisconnected = function (input) {
      this.precedents.splice(this.precedents.indexOf(input.id), 1);
    };
    AbstractSoundnode.prototype.init = function(audioContext, id, name, type, posx, posy, value, precedent, suivant) {
      this.id = id;
      if(typeof name === 'undefined' || name === null) {
        this.name = type+''+id;
      } else {
        this.name = name;
      }
      this.type = type;
      this.posx = posx;
      this.posy=  posy;
      this.value = value;
      this.precedents = precedent;
      this.suivants = suivant;
      this.parameters = [];

      this.initNode(audioContext);
    };
    AbstractSoundnode.prototype.setValue = function() {
      $log.warn('calling the prototype of setValue()');
    };
    AbstractSoundnode.prototype.setParameters = function(paramName) {
      $log.warn('calling the prototype of setParameters()');
    };
    AbstractSoundnode.prototype.getInput = function() {
      return this.node;
    };
    AbstractSoundnode.prototype.getOutput = function() {
      return this.node;
    };
    // Public API here
    return AbstractSoundnode;
  });
