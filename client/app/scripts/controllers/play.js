'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('PlayCtrl', function ($scope, $routeParams, $timeout, $location, NodeStorage, wsEffects, InitInput) {
    $scope.nodeStorage = NodeStorage.get();

    $scope.$on('$viewContentLoaded', function(){

      wsEffects.get($routeParams.id).then(function (response) {
        $log.debug(response);
        $scope.nodeStorage.setupPedal(response.effects);
        $timeout(function () {
          $scope.nodeStorage.redoConnections();
          saveState.save($routeParams.id);
        }, 1000);
      }, function () {
        $location.path('/');
      });

      InitInput.getMediaInput().then(function (node) {
        NodeStorage.get().storage[0].output = node;
        $scope.nodeStorage.restaureConnections(0);
      }, function (err) {
      });
    });

    $scope.$on("$destroy", function(){
      NodeStorage.get().wipe();
    });
  });
