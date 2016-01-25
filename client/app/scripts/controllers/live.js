'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $log) {
    var vm = this;

    $scope.ready = false;
    vm.audionodes = [
      {
        id: 0,
        type: 'input',
        posx: null,
        posy: null,
        value: null,
        precedent: null,
        suivant: null
      },
      {
        id: 1,
        type: 'output',
        posx: null,
        posy: null,
        value: null,
        precedent: null,
        suivant: null
      }
    ];

    var init = function() {
      navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

      if (navigator.getUserMedia) {
        console.log('getUserMedia supported.');
        $scope.ready = true;
      } else {
        $scope.ready = false;
      }
    };
    init();

    $scope.$on('$viewContentLoaded', function(){
      jsPlumb.setContainer("live-page");

      jsPlumb.bind('connection', function(info) {
        var inputElm = angular.element(document).find('#soundnode'+info.sourceId);
        var outputElm = angular.element(document).find('#soundnode'+info.targetId);
        var inputNode = inputElm.scope().soundnode;
        var outputNode = outputElm.scope().soundnode;
        inputNode.connect(outputNode);
        outputNode.isConnected(inputNode);
      });
      jsPlumb.bind('connectionDetached', function(info) {
        var inputElm = angular.element(document).find('#soundnode'+info.sourceId);
        var outputElm = angular.element(document).find('#soundnode'+info.targetId);
        var inputNode = inputElm.scope().soundnode;
        var outputNode = outputElm.scope().soundnode;
        inputNode.disconnect();
        outputNode.isDisconnected()
      });
    });

  });
