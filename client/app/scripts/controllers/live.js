'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', function ($scope, $log, NodeStorage) {
    var vm = this;
    var nodeStorage = new NodeStorage();

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

    $scope.getNodeStorageArray = function() {
      var result = [];
      for (var n in nodeStorage.storage) {
        // skip loop if the property is from prototype
        if(!nodeStorage.storage.hasOwnProperty(n)) continue;
        result.push(nodeStorage.storage[n]);
      }
      return result;
    };

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

      nodeStorage.addNode(intput);
      nodeStorage.addNode(output);

      var gain = angular.copy(defaultNode);
      gain.id = 3;
      gain.type = 'gain';
      nodeStorage.addNode(gain);
    };
    init();

    $scope.$on('$viewContentLoaded', function(){
      jsPlumb.setContainer("live-page");

      jsPlumb.bind('connection', function(info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        nodeStorage.connect(inputId, outputId);
      });
      jsPlumb.bind('connectionDetached', function(info) {
        var inputId = info.sourceId;
        var outputId = info.targetId;
        nodeStorage.disconnect(inputId, outputId);
      });
    });

  });
