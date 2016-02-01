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
    AbstractSoundnode.prototype.type = null;
    AbstractSoundnode.prototype.posx = null;
    AbstractSoundnode.prototype.posy =  null;
    AbstractSoundnode.prototype.precedents = [];
    AbstractSoundnode.prototype.suivants = [];
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
      this.suivant.push(output.id);
    };
    AbstractSoundnode.prototype.isConnected = function (input) {
      this.precedent.push(input.id);
    };
    AbstractSoundnode.prototype.disconnect = function (output) {
      this.output.disconnect();
      this.suivants.splice(this.suivants.indexOf(output.id), 1);
    };
    AbstractSoundnode.prototype.isDisconnected = function (input) {
      this.precedents.splice(this.precedents.indexOf(input.id), 1);
    };
    AbstractSoundnode.prototype.init = function(audioContext, id, type, posx, posy, value, precedent, suivant) {
      this.id = id;
      this.type = type;
      this.posx = posx;
      this.posy=  posy;
      this.value = value;
      this.precedent = precedent;
      this.suivant = suivant;

      this.initNode(audioContext);
    };
    // Public API here
    return AbstractSoundnode;
  });
