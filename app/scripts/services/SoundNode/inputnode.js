'use strict';

/**
 * Input node that take a recording device as input
 * @ngdoc service
 * @name webClientSideApp.Inputnode
 * @description
 * # Inputnode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('inputnode', function ($log, abstractSoundnode) {
    // Service logic

    // Public API here
    return {
      create: function (audioContext, id, posx, posy, value, precedent, suivant) {
        var soundnode = abstractSoundnode.create();
        soundnode.type = 'input';

        soundnode.initPlumb = function(id) {
          jsPlumb.addEndpoint(""+id, {
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
        };
        soundnode.initNode = function(audioContext, input, output) {
          navigator.getUserMedia(
            {audio: true},
            function(stream) {
              output = audioContext.createMediaStreamSource(stream);
            },
            function(err) {
              console.log('The following gUM error occured: ' + err);
            }
          );
        };

        soundnode.init(audioContext, id, posx, posy, value, precedent, suivant);
        return soundnode;
      }
    };
  });
