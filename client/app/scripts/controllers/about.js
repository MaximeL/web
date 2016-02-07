'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('AboutCtrl', [ '$scope', function ($scope) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.elts = [];
    $scope.elts.push("elt0");
    $scope.name = "name0";

  }]);
