'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:audioNode
 * @description
 * # audioNode
 */
angular.module('webClientSideApp')
  .directive('audioNode', function ($log, audionodeSelector, audiocontext) {
    return {
      scope: {
        nodeId: '=nid',
        nodeType: '=type'
      },
      restrict: 'EA',
      controller: ['$scope', '$log', function($scope, $log) {
      }],
      link: function postLink(scope, element, attrs) {
        $log.info('ceating node of type : '+scope.nodeType);
        element.addClass("soundnode");
        element.addClass(scope.nodeType);
        element.attr('id', scope.nodeId);

        if(scope.nodeType !== 'output') {
          jsPlumb.addEndpoint("" + scope.nodeId, {
            anchor: "Right"
          }, {
            isSource: true,
            isTarget: false,
            connector: "Straight",
            endpoint: "Dot",
            paintStyle: {fillStyle: "blue", outlineColor: "blue", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "blue"},
            connectorStyle: {strokeStyle: "blue", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2}
          });

        //  jsPlumb.draggable(element);
        }
        if(scope.nodeType !== 'input') {
          jsPlumb.addEndpoint("" + scope.nodeId, {
            anchor: "Left"
          }, {
            isSource: false,
            isTarget: true,
            connector: "Straight",
            endpoint: "Dot",
            paintStyle: {fillStyle: "red", outlineColor: "red", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "red"},
            connectorStyle: {strokeStyle: "red", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2}
          });

          jsPlumb.draggable(element);
        }
      }
    };
  });

//id="soundnode{{nodeData.id}}"
