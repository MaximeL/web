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
        $log.debug('connection event');
        $log.debug(info);
        var inputElm = angular.element(document).find('#'+info.sourceId);
        var outputElm = angular.element(document).find('#'+info.targetId);

        $log.debug(inputElm);
        $log.debug(outputElm);

        var inputNode = inputElm.scope();
        var outputNode = outputElm.scope();

        $log.debug(inputNode);
        $log.debug(outputNode);

        inputNode.connect(outputNode.input);
      });
      jsPlumb.bind('connectionDetached', function(info) {
        $log.debug('disconnect event');
        $log.debug(info);

        var inputElm = angular.element(document).find('#'+info.sourceId);
        $log.debug(inputElm);

        var inputNode = inputElm.scope().soundnode;
        $log.debug(inputNode);

        inputNode.disconnect();
      });
    });

  });
