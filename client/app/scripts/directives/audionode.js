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
        nodeId: '=nid',
        nodeType: '=type'
      },
      restrict: 'EA',
      controller: ['$scope', '$log', function($scope, $log) {
      }],
      link: function postLink(scope, element, attrs) {
        //setting id and class
        $log.info('ceating node of type : '+scope.nodeType);
        element.addClass("soundnode");
        element.addClass(scope.nodeType);
        element.attr('id', scope.nodeId);

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
        observer.observe(angular.element.find('#'+scope.nodeId)[0], config);

        //adding the endpoints
        if(scope.nodeType !== 'output') {
          angular.element.find('#'+scope.nodeId)[0].nodeOutput = jsPlumb.addEndpoint("" + scope.nodeId, {
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
          angular.element.find('#'+scope.nodeId)[0].nodeInput = jsPlumb.addEndpoint("" + scope.nodeId, {
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
          jsPlumb.draggable("" + scope.nodeId);
          console.log("position -----> ");
          element.bind("click", function(){
            console.log("clickkkkk");
            console.log(element.position());
            scope.top = element.position().top;
            scope.left = element.position().left;
          });
          console.log("<-------- position");
        }
      }
    };
  });

//id="soundnode{{nodeData.id}}"
