'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:audioNode
 * @description
 * # audioNode
 */
angular.module('webClientSideApp')
  .directive('audioNode', function ($log, $routeParams, saveState) {
    return {
      scope: {
        node: '=snode'
      },
      restrict: 'EA',
      controller: ['$scope', '$log', function($scope, $log) {
      }],
      link: function postLink(scope, element, attrs) {
        //setting id and class
        $log.info('ceating node of type : '+scope.node.type);
        element.addClass("soundnode");
        element.addClass(scope.node.type);
        element.attr('id', scope.node.id);
        angular.element.find('#'+scope.node.id)[0].style.left = scope.node.posx+"px";
        angular.element.find('#'+scope.node.id)[0].style.top = scope.node.posy+"px";

        //This is for refresh the position of the endpoints on each move
        //TODO : refresh locally on the endpoints concerned. here it refresh all the endpoints. That's heavy
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            jsPlumb.repaintEverything();
          });
        });
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
        observer.observe(angular.element.find('#'+scope.node.id)[0], config);

        //adding the endpoints
        if(scope.node.type !== 'output') {
          angular.element.find('#'+scope.node.id)[0].nodeOutput = jsPlumb.addEndpoint("" + scope.node.id, {
            anchor: "Right"
          }, {
            isSource: true,
            isTarget: false,
            connector: "Straight",
            endpoint: "Dot",
            paintStyle: {fillStyle: "#5289FF", outlineColor: "#5289FF", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "#5289FF"},
            connectorStyle: {strokeStyle: "#5289FF", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2},
            maxConnections: 6
          });
        //  jsPlumb.draggable(element);
        }
        if(scope.node.type !== 'input') {
          angular.element.find('#'+scope.node.id)[0].nodeInput = jsPlumb.addEndpoint("" + scope.node.id, {
            anchor: "Left"
          }, {
            isSource: false,
            isTarget: true,
            connector: "Straight",
            endpoint: "Dot",
            paintStyle: {fillStyle: "#FF5D56", outlineColor: "#FF5D56", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "#FF5D56"},
            connectorStyle: {strokeStyle: "#FF5D56", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2},
            maxConnections: 20
          });
        }
        if(scope.node.type !== 'input' && scope.node.type !== 'output') {
          jsPlumb.draggable("" + scope.node.id);
          element.bind("click", function () {
            var ns = saveState.getNodeStorage($routeParams.id);
            ns.storage[scope.node.id].posy = element.position().top;
            ns.storage[scope.node.id].posx = element.position().left;
            saveState.setNodeStorage(ns, $routeParams.id);
          });
        }
      }
    };
  });

//id="soundnode{{nodeData.id}}"
