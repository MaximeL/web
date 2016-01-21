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
  .factory('AbstractSoundnode', function () {

    // Service logic
    function AbstractSoundnode() {}

    AbstractSoundnode.prototype.id = null;
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
    AbstractSoundnode.prototype.connect = function(target) {
      this.output.connect(target);
    };
    AbstractSoundnode.prototype.disconnect = function () {
      this.output.disconnect();
    };
    AbstractSoundnode.prototype.initPlumb = function() {
      jsPlumb.addEndpoint(""+this.id, {
        anchor:"Right"
      }, {
        isSource:true,
        isTarget:false,
        connector:"Straight",
        endpoint:"Dot",
        paintStyle:{ fillStyle:"blue", outlineColor:"blue", outlineWidth:1 },
        hoverPaintStyle:{ fillStyle:"blue" },
        connectorStyle:{ strokeStyle:"blue", lineWidth:1 },
        connectorHoverStyle:{ lineWidth:2 }
      });
      jsPlumb.addEndpoint(""+this.id, {
        anchor:"Left"
      }, {
        isSource:false,
        isTarget:true,
        connector:"Straight",
        endpoint:"Dot",
        paintStyle:{ fillStyle:"red", outlineColor:"red", outlineWidth:1 },
        hoverPaintStyle:{ fillStyle:"red" },
        connectorStyle:{ strokeStyle:"red", lineWidth:1 },
        connectorHoverStyle:{ lineWidth:2 }
      });
    };
    AbstractSoundnode.prototype.init = function(audioContext, id, posx, posy, value, precedent, suivant) {
      this.id = id;
      this.posx = posx;
      this.posy=  posy;
      this.value = value;
      this.precedent = precedent;
      this.suivant = suivant;

      this.initPlumb();
      this.initNode(audioContext);
    };
    // Public API here
    return AbstractSoundnode;
  });
