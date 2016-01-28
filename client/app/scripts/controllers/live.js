'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $window, $log, NodeStorage) {
    var vm = this;
    $scope.nodeStorage = new NodeStorage();

    $scope.ready = false;
    var intput = {
        id: 0,
        type: 'input',
        posx: null,
        posy: null,
        value: null,
        suivant: null
      };
    var output = {
        id: 1,
        type: 'output',
        posx: null,
        posy: null,
        value: null,
        precedent: null
      };
    var defaultNode ={
      id: null,
      type: null,
      posx: null,
      posy: null,
      value: null,
      precedent: null,
      suivant: null
    };

    angular.element($window).bind('resize', function() {
      jsPlumb.repaintEverything();
      $scope.apply();
    });

    var init = function() {
      $log.info('begin init');
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

      $scope.nodeStorage.addNode(intput);
      $scope.nodeStorage.addNode(output);

      var gain = angular.copy(defaultNode);
      gain.id = 3;
      gain.type = 'gain';
      $scope.nodeStorage.addNode(gain);

      var filter = angular.copy(defaultNode);
      filter.id = 6;
      filter.type = 'allpass';
      $scope.nodeStorage.addNode(filter);
    };
    init();

    $scope.$on('$viewContentLoaded', function(){
      jsPlumb.setContainer("live-page");

      jsPlumb.bind('connection', function(info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.connect(inputId, outputId);
      });
      jsPlumb.bind('connectionDetached', function(info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.disconnect(inputId, outputId);
      });
    });

    $scope.isUndefined = function(item) {
      return (typeof item !== 'undefined');
    };

    $scope.test = 'coucou';
    $scope.testNoArg = function() {
      $log.debug('in testNoArg');
      return 'salut';
    };
    $scope.testArg = function(arg) {
      $log.debug('in testNoArg');
      $log.debug('in testArg');
    };

  });
