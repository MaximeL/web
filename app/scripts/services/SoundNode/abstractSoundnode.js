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
  .factory('abstractSoundnode', function () {

    // Service logic
    var soundnode = {
      initNode: function(audioContext) {
        //kind of exemple of what should be done here
        this.output = audioContext.createGain();
        this.input = audioContext.createGain();
        this.input.connect(this.output);
      },
      connect: function(target) {
        this.output.connect(target);
      },
      disconnect: function () {
        this.output.disconnect();
      },
      initPlumb: function() {
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
        jsPlumb.addEndpoint(""+id, {
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
      },
      init: function(audioContext, id, posx, posy, value, precedent, suivant) {
        this.id = id;
        this.posx = posx;
        this.posy=  posy;
        this.value = value;
        this.precedent = precedent;
        this.suivant = suivant;

        this.initPlumb();
        this.initNode(audioContext);
      }
    };
    // Public API here
    return {
      create: function () {
        return soundnode;
      }
    };
  });
