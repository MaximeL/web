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
  .factory('Inputnode', function ($log, AbstractSoundnode) {
    // Service logic
    function Inputnode() {}
    Inputnode.prototype = Object.create(AbstractSoundnode.prototype);

    Inputnode.prototype.type = 'input';

    Inputnode.prototype.initPlumb = function() {
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
    };
    Inputnode.prototype.initNode = function(audioContext) {
      var self = this;
      navigator.getUserMedia(
        {audio: true},
        function(stream) {
          self.output = audioContext.createMediaStreamSource(stream);
        },
        function(err) {
          console.log('The following gUM error occured: ' + err);
        }
      );
    };

    // Public API here
    return Inputnode;
  });
