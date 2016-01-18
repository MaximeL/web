'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:drGainnode
 * @description
 * # drGainnode
 */
angular.module('webClientSideApp')
  .directive('drGainnode', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the drGainnode directive');
      }
    };
  });
