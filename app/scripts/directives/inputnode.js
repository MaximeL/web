'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:Inputnode
 * @description
 * # Inputnode
 */
angular.module('webClientSideApp')
  .directive('Inputnode', function (Inputnode) {
    return {
      template: '<div class="soundnode input"></div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.text('this is the Inputnode directive');
      }
    };
  });
