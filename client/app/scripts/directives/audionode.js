'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:audioNode
 * @description
 * # audioNode
 */
angular.module('webClientSideApp')
  .directive('audioNode', function ($log, $window, audionodeSelector, audiocontext) {
    return {
      scope: {
        node: '=snode'
      },
      restrict: 'EA',
      controller: ['$scope', '$log', function($scope, $log) {
      }],
      link: function postLink(scope, element, attrs) {
        $log.debug(scope);
        //setting id and class
        $log.info('ceating node of type : '+scope.node.type);
        element.addClass("soundnode");
        element.addClass(scope.node.type);
        element.attr('id', scope.node.id);

        //This is for refresh the position of the endpoints on each move
        //TODO : refresh locally on the endpoints concerned. here it refresh all the endpoints. That's heavy
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            console.log(mutation.type);
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
            paintStyle: {fillStyle: "blue", outlineColor: "blue", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "blue"},
            connectorStyle: {strokeStyle: "blue", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2}
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
            paintStyle: {fillStyle: "red", outlineColor: "red", outlineWidth: 1},
            hoverPaintStyle: {fillStyle: "red"},
            connectorStyle: {strokeStyle: "red", lineWidth: 1},
            connectorHoverStyle: {lineWidth: 2}
          });
          jsPlumb.draggable("" + scope.node.id);
          element.bind("click", function(){
            console.log(element.position());
            scope.node.posy = element.position().top;
            scope.node.posx = element.position().left;
          });
        }
      }
    };
  });

//id="soundnode{{nodeData.id}}"
