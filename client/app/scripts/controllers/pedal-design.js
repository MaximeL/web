'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:PedalDesignCtrl
 * @description
 * # PedalDesignCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('PedalDesignCtrl', ['config', 'NodeStorage', 'wsEffects', '$routeParams', '$http', '$scope', '$notification', '$log', function (config, NodeStorage, wsEffects, $routeParams, $http, $scope, $notification, $log) {
    $scope.nodeStorage = NodeStorage.get();
    $scope.effects = [];
    wsEffects.get($routeParams.id).then(function (response) {
      $scope.nodeStorage.setupPedal(response.effects);

      for (var i = 0; i < $scope.nodeStorage.storage.length; i++) {
        if ($scope.nodeStorage.storage[i] != undefined && $scope.nodeStorage.storage[i].type != "input" && $scope.nodeStorage.storage[i].type != "output") {
          var el = $scope.nodeStorage.storage[i];
          var keys = Object.keys(el.value);
          for (var j = 0; j < keys.length; j++) {
            var item = {
              cleanName: el.type + ": " + keys[j] + " (" + el.name + ")",
              label: el.type + " (" + keys[j] + ")",
              name: el.name + keys[j],
              used: false,
              value: el.value[keys[j]],
              min: 0,
              max: 999
            };
            $scope.effects.push(item);
          }
        }
      }
    }, function () {
      $location.path('/');
    });

    $scope.background = 'metal';

    var potarCounter = 0;
    $scope.changePotar = function (el, name) {
      if (el) { potarCounter++; }
      else {
        potarCounter--;
        for(var i = 1; i <= 4; i++) {
          if($scope["potar" + i] == name) {
            $scope["potar" + i] = undefined;
            // TODO : Hide element
            break;
          }
        }
      }

      if (potarCounter > 4) {
        el = false;
        potarCounter--;

        $scope.effects.forEach(function (item) {
          if (item.name == name) {
            item.used = el;
          }
        });
        $notification.info("Information:", "Vous ne pouvez pas ajouter plus de potars.")
      }

      if(el) {
        var potarId;
        for(var i = 1; i <= 4; i++) {
          if($scope["potar" + i] == undefined) {
            $scope["potar" + i] = name;
            potarId = "potar" + i;
            break;
          }
        }

        var item;
        for(var i = 0; i < $scope.effects.length; i++) {
          if($scope.effects[i].name == name) {
            item = $scope.effects[i];
            break;
          }
        }
        console.log(item);
        // TODO : Display
        //console.log(angular.element.find('#'+potarId)[0]);

        var potar = nx.widgets[potarId];

        potar.val.value = item.value;
        potar.min = item.min;
        potar.max = item.max;
        potar.label = item.label;
        potar.draw();
      }
    };

    $scope.$on("$destroy", function(){
      NodeStorage.get().wipe();
      $log.warn('living design controller !');
    });
  }]);
