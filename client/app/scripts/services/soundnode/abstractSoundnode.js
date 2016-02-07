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
    AbstractSoundnode.prototype.output = null;
    AbstractSoundnode.prototype.input = null;

    AbstractSoundnode.prototype.initNode = function(audioContext) {
      //kind of exemple of what should be done here
      this.output = audioContext.createGain();
      this.input = audioContext.createGain();
      this.input.connect(this.output);
    };
    AbstractSoundnode.prototype.connect = function(output) {
      this.output.connect(output.input);
      this.suivants.push(output.id);
    };
    AbstractSoundnode.prototype.isConnected = function (input) {
      this.precedents.push(input.id);
    };
    AbstractSoundnode.prototype.disconnect = function (output) {
      this.output.disconnect();
      this.suivants.splice(this.suivants.indexOf(output.id), 1);
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
    // Public API here
    return AbstractSoundnode;
  });
