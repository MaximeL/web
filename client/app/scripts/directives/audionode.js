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
        id: '@',
        type: '@',
        posx: '@',
        posy: '@',
        value: '@',
        precedent: '@',
        suivant: '@'
      },
      restrict: 'EA',
      controller: ['$scope', '$log', function($scope, $log) {
        /*$log.debug('scopeCtrl');
         $log.debug($scope);*/
      }],
      link: function postLink(scope, element, attrs) {
        element.addClass("soundnode");
        element.addClass(scope.type);
        element.attr('id', scope.id);
        element.text(scope.type);

        //$log.debug(audionodeSelector.getAudionode(scope.type));
        element.scope().soundnode = audionodeSelector.getAudionode(scope.type);
        element.scope().soundnode.init(audiocontext.get(),
          scope.id,
          scope.posx,
          scope.posy,
          scope.value,
          scope.precedent,
          scope.suivant);

        /*$log.debug('scopeLink');
         $log.debug(scope);*/
      }
    };
  });
