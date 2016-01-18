'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:Inputnode
 * @description
 * # Inputnode
 */
angular.module('webClientSideApp')
  .directive('drInputnode', function ($log, inputnode, audiocontext) {
    return {
      template: '<div class="soundnode" id="input">' +
      '<div class="my-container">' +
      'Input' +
      '</div>' +
      '</div>',
      restrict: 'EA',
      scope: {},
      link: function postLink(scope, element, attrs) {
        var linkOut = element.find(".link-out");
        $log.debug(linkOut);

        console.log('getUserMedia supported.');
        navigator.getUserMedia(
          {audio: true},
          function(stream) {
            scope.soundnode = inputnode.create(audiocontext.get(), stream);
            jsPlumb.addEndpoint("input", {
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
          },
          function(err) {
            console.log('The following gUM error occured: ' + err);
          }
        );
      }
    }
  });
