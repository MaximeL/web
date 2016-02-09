'use strict';

angular.module('webClientSideApp')

  .controller('CreatePedalCtrl', function ($scope, $uibModalInstance) {

    $scope.pedal = {
      name: '',
      description: ''
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.pedal);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
