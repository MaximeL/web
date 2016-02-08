'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $window, $log, $timeout,  $routeParams, $location, NodeStorage, wsEffects, saveState, InitInput, audiocontext) {
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
      'allpass',
      'bandpass',
      'highpass',
      'highshelf',
      'lowpass',
      'lowshelf',
      'notch',
      'peaking',
      'convolver',
      'delay',
      'distorsion',
      'compressor'
    ];

    $scope.addEffect = function(type) {
      var effect = angular.copy(defaultNode);
      effect.type = type;
      $scope.nodeStorage.addNode(effect);
      jsPlumb.repaintEverything();
      saveState.save($routeParams.id);
    };

    $scope.deleteEffect = function(id) {
      $scope.nodeStorage.removeNode(id);
      jsPlumb.repaintEverything();
      saveState.save($routeParams.id);
    };

    $scope.clickPlay = function() {
      if(NodeStorage.get().storage[0].play !== null) {
        if (NodeStorage.get().storage[0].play) {
          NodeStorage.get().storage[0].play = null;
          NodeStorage.get().storage[0].playSound.stop(0);
          NodeStorage.get().storage[0].play = false;
        } else {
          NodeStorage.get().storage[0].play = null;
          InitInput.getMediaPlaySound().then(function (node, data) {
            NodeStorage.get().storage[0].playSound = node;
            NodeStorage.get().storage[0].music = data;
            $scope.nodeStorage.restaureConnections(0);
            NodeStorage.get().storage[0].playSound.start(0);
            NodeStorage.get().storage[0].play = true;
          }, function () {
          });
        }
      }
    };

    angular.element($window).bind('resize', function() {
      jsPlumb.repaintEverything();
      saveState.save($routeParams.id);
    });

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

      wsEffects.get($routeParams.id).then(function (response) {
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

      jsPlumb.bind('connection', function (info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.connect(inputId, outputId);
        saveState.save($routeParams.id);
      });
      jsPlumb.bind('connectionDetached', function (info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        $scope.nodeStorage.disconnect(inputId, outputId);
        saveState.save($routeParams.id);
      });
    });

    //Prevent ngRepeat from try to print undefined elements
    $scope.isUndefined = function(item) {
      return (typeof item !== 'undefined');
    };

    $scope.$on("$destroy", function(){
      NodeStorage.get().wipe();
      angular.element($window).unbind('resize');
      jsPlumb.reset();
    });
  });

//56b31666805a445a3138ccf0
