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
    AbstractSoundnode.prototype.value = null;
    AbstractSoundnode.prototype.precedent = null;
    AbstractSoundnode.prototype.suivant = null;
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
      this.suivant = output.id;
    };
    AbstractSoundnode.prototype.isConnected = function (input) {
      this.precedent = input.id;
    };
    AbstractSoundnode.prototype.disconnect = function () {
      this.output.disconnect();
      this.suivant = null;
    };
    AbstractSoundnode.prototype.isDisconnected = function () {
      this.precedent = null;
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
