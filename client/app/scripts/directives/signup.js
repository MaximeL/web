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

    };
  });
