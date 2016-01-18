'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:drOutputnode
 * @description
 * # drOutputnode
 */
angular.module('webClientSideApp')
  .directive('drOutputnode', function ($log, outputnode, audiocontext) {
    return {
      controller: 'LiveCtrl',
      template: '<div class="soundnode" id="output">' +
      '<div class="my-container">' +
      'Output' +
        '</div>' +
      '</div>',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element, attrs) {
        var linkOut = element.find(".link-out");
        $log.debug(linkOut);

        scope.soundnode = outputnode.create(audiocontext.get());

        jsPlumb.addEndpoint("output", {
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
      }
    };
  });
