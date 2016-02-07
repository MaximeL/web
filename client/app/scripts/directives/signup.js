'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:signup
 * @description
 * # signup
 */
angular.module('webClientSideApp')
  .directive('signup', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the signup directive');
      }
    };
  });
