'use strict';

/**
 * Node that output the connected sound to the default sound of the navigator
 * @ngdoc service
 * @name webClientSideApp.Outputnode
 * @description
 * # Outputnode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('outputnode', function (abstractSoundnode) {
    // Service logic

    // Public API here
    return {
      create: function (audioContext, id, posx, posy, value, precedent, suivant) {
        var soundnode = abstractSoundnode.create();
        soundnode.type = 'output';
        soundnode.initPlumb = function(id) {
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
        };

        soundnode.initNode = function(audioContext, input, output) {
          input = audioContext.destination;
        };

        soundnode.init(audioContext, id, posx, posy, value, precedent, suivant);
        return soundnode;
      }
    };
  });
