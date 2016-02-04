'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $window, $log, $timeout,  $routeParams, $location, NodeStorage, wsEffects, saveState) {
    var vm = this;
    $scope.nodeStorage = NodeStorage.get();
    $scope.ready = false;

    //this should be filled with data from server
    //To get what to save use : $scope.nodeStorage.backup()
    /*var backup = [];
     backup.push(input);
     backup.push(output);*/

    var defaultNode ={
      id: null,
      type: null,
      posx: null,
      posy: null,
      value: null,
      precedents: [],
      suivants: []
    };

    $scope.effects = [
      'gain',
      'allpass',
      'bandpass',
      'highpass',
      'highshelf',
      'lowpass',
      'lowshelf',
      'notch',
      'peaking'//,
      //'convolver'
    ];

    $scope.addEffect = function(type) {
      var effect = angular.copy(defaultNode);
      effect.type = type;
      $scope.nodeStorage.addNode(effect);
      jsPlumb.repaintEverything();
    };

    $scope.deleteEffect = function(id) {
      $scope.nodeStorage.removeNode(id);
      jsPlumb.repaintEverything();
    };

    angular.element($window).bind('resize', function() {
      jsPlumb.repaintEverything();
    });

    var saveCycle = function() {
      $timeout(function() {
        saveState.save($routeParams.id);
        return saveCycle();
      }, 10000);
    };
    saveCycle();

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

    $scope.$on('$viewContentLoaded', function(){
      jsPlumb.setContainer("live-page-pedals");

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

      wsEffects.get($routeParams.id).then(function(response) {
        $log.debug('response');
        $log.debug(response);
        $timeout(function() {
          $scope.nodeStorage.setup(response.effets);
        }, 1000);
      }, function() {
        $location.path('/');
      });
    });

    //Prevent ngRepeat from try to print undefined elements
    $scope.isUndefined = function(item) {
      return (typeof item !== 'undefined');
    };
  });
