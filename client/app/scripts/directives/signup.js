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
      restrict: 'E',
      templateUrl: 'views/partials/_signup.html',
      link: function postLink(scope, element, attrs) {
        element.text('this is the signup directive');
      }
    };
  });
