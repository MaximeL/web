'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:PedalDesignCtrl
 * @description
 * # PedalDesignCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('PedalDesignCtrl', ['config', 'NodeStorage', 'wsEffects', '$routeParams', '$http', '$scope', '$notification', '$log', '$timeout', '$cookies', function (config, NodeStorage, wsEffects, $routeParams, $http, $scope, $notification, $log, $timeout, $cookies) {
    $scope.user = $cookies.getObject('user');
      $scope.nodeStorage = NodeStorage.get();
      $scope.effects = [];
      $scope.backgrounds = [
        {name: "Métal 1", value: "metal1", selected: true},
        {name: "Métal 2", value: "metal2", selected: false},
        {name: "Métal 3", value: "metal3", selected: false},
        {name: "Diamant", value: "diamond1", selected: false},
        {name: "Carbone 1", value: "carbon1", selected: false},
        {name: "Carbone 2", value: "carbon2", selected: false},
        {name: "Carbone 3", value: "carbon3", selected: false},
        {name: "Carbone 4", value: "carbon4", selected: false},
        {name: "Cuir", value: "leather", selected: false},
        {name: "Jean", value: "jean", selected: false},
        {name: "Bleuté", value: "misc-blue", selected: false},
        {name: "Rougeâtre", value: "misc-red", selected: false}
      ];

      $scope.updateSelectedBackground = function (background) {
        $scope.backgrounds.forEach(function (element) {
          element.selected = background.value == element.value;
        });
      };
      $scope.selectedBackground = function () {
        var background;
        $scope.backgrounds.forEach(function (item) {
          if (item.selected) {
            background = item;
          }
        });
        return background;
      };
      wsEffects.get($routeParams.id).then(function (response) {
        $scope.nodeStorage.setupPedal(response.effects);

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
              $timeout(waiter(item, name), 500);
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
      }, function () {
        $location.path('/');
      });

      $scope.potar1 = "";
      $scope.potar2 = "";
      $scope.potar3 = "";
      $scope.potar4 = "";

      $scope.changePotar = function (el, name) {
        if (el) {
          var handler = function (potarId, name) {
            var item;
            for (var i = 0; i < $scope.effects.length; i++) {
              if ($scope.effects[i].name == name) {
                item = $scope.effects[i];
                break;
              }
            }

            var waiter = function (potarId, item) {
              if (nx.widgets[potarId] == undefined || nx.widgets[potarId].val == undefined || nx.widgets[potarId].val.value == undefined) {
                $timeout(waiter(potarId, item), 500);
              } else {
                var potar = nx.widgets[potarId];
                potar.val.value = item.value;
                potar.min = item.min;
                potar.max = item.max;
                potar.label = item.label;
                potar.height = "150";
                potar.width = "100";

                potar.draw();
              }
            };

            waiter(potarId, item);

            document.querySelector("#" + potarId).className = "nx";
            $scope[potarId] = item.name;
          };
          if ($scope.potar1 == "") {
            handler("potar1", name);
          } else if ($scope.potar2 == "") {
            handler("potar2", name);
          } else if ($scope.potar3 == "") {
            handler("potar3", name);
          } else if ($scope.potar4 == "") {
            handler("potar4", name);
          }
        } else {
          for (var i = 1; i <= 4; i++) {
            if ($scope["potar" + i] == name) {
              $scope["potar" + i] = "";
              document.querySelector("#potar" + i).className += " invisible";
              break;
            }
          }
        }
      };

      $scope.saveDesign = function () {
        var data = {
          background: $scope.selectedBackground().value,
          user: $scope.user.id
        };

        $scope.effects.forEach(function (effect) {
          if (effect.name == $scope.potar1) {
            data.potar1 = JSON.stringify(effect);
            return;
          }
          if (effect.name == $scope.potar2) {
            data.potar2 = JSON.stringify(effect);
            return;
          }
          if (effect.name == $scope.potar3) {
            data.potar3 = JSON.stringify(effect);
            return;
          }
          if (effect.name == $scope.potar4) {
            data.potar4 = JSON.stringify(effect);
            return;
          }
        });

        $http.put(
          config.apiURL + config.pedals + $routeParams.id + config.pedal_design,
          data
        ).success(function (response) {
          $notification.success("Félicitations !", "Le design de la pédale a bien été sauvegardé");
        }).error(function (response) {
          console.log(response);
          $notification.error("Erreur !", "Une erreur est survenue lors de la sauvegarde de la pédale : " + response.message);
        });
      };

      $scope.$on("$destroy", function () {
        NodeStorage.get().wipe();
        $log.warn('living design controller !');
      });
  }]);
