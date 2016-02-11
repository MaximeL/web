'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $window, $log, $timeout,  $routeParams, $location, wsEffects, saveState, InitInput) {
    $scope.pedalId = $routeParams.id;

    /*if($scope.nodeStorage === null) {
      $location.path('/');
    }*/
    $scope.ready = false;

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      console.log('LiveCtrl : getUserMedia supported.');
      $scope.ready = true;
    } else {
      $scope.ready = false;
    }
    //this should be filled with data from server
    //To get what to save use : $scope.nodeStorage.backup()
    /*var backup = [];
     backup.push(input);
     backup.push(output);*/

    var defaultNode ={
      id: null,
      name: null,
      type: null,
      posx: null,
      posy: null,
      value: {},
      precedents: [],
      suivants: []
    };

    $scope.effects = [
      'gain',
      'tremolo',
      'convolver',
      'overdrive',
      'delay',
      'compressor',
      'allpass',
      'bandpass',
      'highpass',
      'highshelf',
      'lowpass',
      'lowshelf',
      'notch',
      'peaking'
    ];

    $scope.addEffect = function(type) {
      var effect = angular.copy(defaultNode);
      effect.type = type;
      $scope.nodeStorage.addNode(effect);
      jsPlumb.repaintEverything();
      saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
      saveState.saveState();
    };

    $scope.deleteEffect = function(id) {
      $scope.nodeStorage.removeNode(id);
      jsPlumb.repaintEverything();
      saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
      saveState.saveState();
    };

    $scope.save = function () {
      saveState.save($routeParams.id);
    };

    $scope.clickPlay = function() {
      if($scope.nodeStorage.storage[0].play !== null) {
        if ($scope.nodeStorage.storage[0].play) {
          $scope.nodeStorage.storage[0].play = null;
          $scope.nodeStorage.storage[0].playSound.stop(0);
          $scope.nodeStorage.storage[0].play = false;
        } else {
          $scope.nodeStorage.storage[0].play = null;
          InitInput.getMediaPlaySound().then(function (node, data) {
            $scope.nodeStorage.storage[0].playSound = node;
            $scope.nodeStorage.storage[0].music = data;
            $scope.nodeStorage.restaureConnections(0);
            $scope.nodeStorage.storage[0].playSound.start(0);
            $scope.nodeStorage.storage[0].play = true;
          }, function () {
          });
        }
      }
    };

    angular.element($window).bind('resize', function() {
      jsPlumb.repaintEverything();
      saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
      saveState.saveState();
    });

    $scope.$on('$viewContentLoaded', function(){
      jsPlumb.setContainer("live-page-pedals");
      //$scope.nodeStorage = saveState.getNodeStorage($scope.pedalId);

      wsEffects.get($routeParams.id).then(function (response) {
        $scope.nodeStorage = saveState.getNodeStorage($scope.pedalId);
        $log.debug('nodeStorage : ');
        $log.debug($scope.nodeStorage);
        $scope.nodeStorage.setupPedal(response.effects);
        $timeout(function () {
          $scope.nodeStorage.redoConnections();
          $log.info('before crash');
          $log.debug($scope.nodeStorage);
          saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
          saveState.saveState();
        }, 1000);
      }, function () {
        if(saveState.getNodeStorage($scope.pedalId) === null) {
          $location.path('/');
        } else {
          $scope.nodeStorage = saveState.getNodeStorage($scope.pedalId);
        }
      });

      InitInput.getMediaInput().then(function (node) {
        $scope.nodeStorage.storage[0].output = node;
        $scope.nodeStorage.restaureConnections(0);
      }, function (err) {
      });

      jsPlumb.bind('connection', function (info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.connect(inputId, outputId);
        saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
        saveState.saveState();
      });
      jsPlumb.bind('connectionDetached', function (info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.disconnect(inputId, outputId);
        saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
        saveState.saveState();
      });
      jsPlumb.bind('connectionMoved', function (info) {
        var inputId = info.originalSourceId;
        var outputId = info.originalTargetId;
        $scope.nodeStorage.disconnect(inputId, outputId);

        inputId = info.newSourceId;
        outputId = info.newTargetId;
        $scope.nodeStorage.connect(inputId, outputId);
        saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
        saveState.saveState();
      });
    });

    //Prevent ngRepeat from try to print undefined elements
    $scope.isUndefined = function(item) {
      return (typeof item !== 'undefined');
    };

    $scope.$on("$destroy", function(){
      saveState.setNodeStorage($scope.nodeStorage, $scope.pedalId);
      saveState.saveState();
      $scope.nodeStorage.wipe();
      angular.element($window).unbind('resize');
      jsPlumb.reset();
    });
  });

//56b31666805a445a3138ccf0
