'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:signin
 * @description
 * # signin
 */
angular.module('webClientSideApp')
  .directive('signin', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the signin directive');
      }
    };
  });
