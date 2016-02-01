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

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      console.log('getUserMedia supported.');
    }

  }]);
