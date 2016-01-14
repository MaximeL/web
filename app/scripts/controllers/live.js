'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope) {
    var vm = this;

      $scope.ready = false;

    vm.audionodes = [];

    var init = function() {

      navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

      $scope.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      if (navigator.getUserMedia) {
        console.log('getUserMedia supported.');
        $scope.ready = true;
      } else {
        $scope.ready = false;
      }
    };
    init();

  });
