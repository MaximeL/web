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
        nodeData: '=node'
      },
      restrict: 'EA',
      //replace: true,
      templateUrl: function(elem, attr) {
        $log.info('in TemplateUrl');
        $log.debug(elem);
        $log.debug(attr);
        return 'views/templates/audionode/basicnode.html';
      },
      controller: ['$scope', '$log', function($scope, $log) {
        /*$log.debug('scopeCtrl');
         $log.debug($scope);*/
      }],
      link: function postLink(scope, element, attrs) {
        $log.info('in link');
        $log.debug(element);
        //element.addClass("soundnode");
        //element.addClass(scope.type);
        element.attr('id', 'soundnode'+scope.id);
        //element.text(scope.type);


        //$log.debug(audionodeSelector.getAudionode(scope.type));
        $log.debug(scope);
        element.scope().soundnode = audionodeSelector.getAudionode(scope.nodeData.type);
        element.scope().soundnode.init(audiocontext.get(),
          scope.nodeData.id,
          scope.nodeData.posx,
          scope.nodeData.posy,
          scope.nodeData.value,
          scope.nodeData.precedent,
          scope.nodeData.suivant);

        /*$log.debug('scopeLink');
         $log.debug(scope);*/
      }
    };
  });
