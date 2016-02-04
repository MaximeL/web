'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:PedalDesignCtrl
 * @description
 * # PedalDesignCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('PedalDesignCtrl', ['config', '$routeParams', '$http', function (config, $routeParams, $http) {
    console.log($routeParams.id);
    console.log(config.apiURL);
  }]);
