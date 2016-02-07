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
      restrict: 'E',
      templateUrl: 'views/partials/_signin.html',

    };
  });
