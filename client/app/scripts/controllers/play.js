'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('PlayCtrl', function ($scope, $cookies, $routeParams, $timeout, $location, $log, NodeStorage, wsEffects, InitInput) {
    $scope.user = $cookies.getObject('user');
    $scope.id = $routeParams.id;

    $scope.nodeStorage = NodeStorage.get();
    $scope.effects = [];

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      console.log('getUserMedia supported.');
    } else {}

    $scope.backgrounds = [
      {name: "Metal 1", value: "metal1", selected: true},
      {name: "Metal 2", value: "metal2", selected: false},
      {name: "Metal 3", value: "metal3", selected: false},
      {name: "Diamond", value: "diamond1", selected: false},
      {name: "Carbon 1", value: "carbon1", selected: false},
      {name: "Carbon 2", value: "carbon2", selected: false},
      {name: "Carbon 3", value: "carbon3", selected: false},
      {name: "Carbon 4", value: "carbon4", selected: false},
      {name: "Leather", value: "leather", selected: false},
      {name: "Jean", value: "jean", selected: false},
      {name: "Blue", value: "misc-blue", selected: false},
      {name: "Red", value: "misc-red", selected: false}
    ];

    $scope.$on('$viewContentLoaded', function(){

      wsEffects.get($routeParams.id).then(function (response) {
        $scope.nodeStorage.setupPedal(response.effects);
        $timeout(function () {
          $scope.nodeStorage.redoConnectionsNodes();
        }, 1000);

        for (var i = 0; i < $scope.nodeStorage.storage.length; i++) {
          if ($scope.nodeStorage.storage[i] != undefined && $scope.nodeStorage.storage[i].type != "input" && $scope.nodeStorage.storage[i].type != "output") {
            var el = $scope.nodeStorage.storage[i];
            var keys = Object.keys(el.value);
            for (var j = 0; j < keys.length; j++) {
              var param;
              for (var k = 0; k < el.parameters.length; k++) {
                if (el.parameters[k].name == keys[j]) {
                  param = el.parameters[k];
                  break;
                }
              }

              var item = {
                cleanName: el.type + ": " + keys[j] + " (" + el.name + ")",
                label: el.type + " (" + keys[j] + ")",
                name: el.name + keys[j],
                used: false,
                value: el.value[keys[j]],
                min: param.min,
                max: param.max,
                step: param.step,
                idNode: el.id,
                paramNode: keys[j]
              };
              $scope.effects.push(item);
            }
          }
        }

        if (response.design !== undefined) {
          $scope.backgrounds.forEach(function (background) {
            background.selected = background.value == response.design.background;
          });

          var waiter = function (item, name) {
            if (nx.widgets == undefined || nx.widgets[name] == undefined || nx.widgets[name].val == undefined) {
              setTimeout(waiter(item, name), 500);
            } else {
              var potar = nx.widgets[name];
              potar.val.value = item.value;
              potar.min = item.min;
              potar.max = item.max;
              potar.label = item.label;

              potar.draw();
              document.querySelector("#" + name).className = "nx";
              $scope[name] = item.name;
              $scope.effects.forEach(function (effect) {
                if (!effect.used) {
                  effect.used = effect.name == item.name;
                }
              })
            }
          };
          if (response.design.potar1 != undefined) {
            waiter(JSON.parse(response.design.potar1), 'potar1');
          }
          if (response.design.potar2 != undefined) {
            waiter(JSON.parse(response.design.potar2), 'potar2');
          }
          if (response.design.potar3 != undefined) {
            waiter(JSON.parse(response.design.potar3), 'potar3');
          }
          if (response.design.potar4 != undefined) {
            waiter(JSON.parse(response.design.potar4), 'potar4');
          }
        }

        InitInput.getMediaInput().then(function (node) {
          NodeStorage.get().storage[0].output = node;
          $scope.nodeStorage.restaureConnections(0);
        }, function (err) {});
        $log.warn('end of the road');
        $log.warn($scope.nodeStorage.storage);
      }, function () {
        $location.path('/');
      });
    });

    $scope.selectedBackground = function () {
      var background;
      $scope.backgrounds.forEach(function (item) {
        if (item.selected) {
          background = item;
        }
      });
      return background;
    };

    $scope.$on("$destroy", function(){
      NodeStorage.get().wipe();
    });
  });
