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
  .factory('Outputnode', function ($log, AbstractSoundnode) {
    // Service logic
    function Outputnode() {}
    Outputnode.prototype = Object.create(AbstractSoundnode.prototype);

    Outputnode.prototype.type = 'output';

    Outputnode.prototype.initPlumb = function() {
      $log.info('inputnode initplumb');
      $log.debug(this.id);
      jsPlumb.addEndpoint("soundnode"+this.id, {
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
    Outputnode.prototype.initNode = function(audioContext) {
      this.input = audioContext.destination;
    };

    // Public API here
    return Outputnode;
  });
