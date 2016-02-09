'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')

  .controller('MainCtrl', function ($scope, $cookies, $rootScope, md5, NodeStorage, $http, $notification, user, pedal, $location, config, $uibModal) {

    $scope.user = $cookies.getObject('user');

    /**
     * Recup des pedales pour un user
     */
    $http.get(config.apiURL + config.users + $scope.user.id)
      .success(function (response) {
        $scope.user.pedals = response.pedals;
        $scope.user.shared = response.shared;

          var pedals = $scope.user.pedals;
          $scope.user.pedals = [];
          // Pour chaque pédales possédées
          pedals.forEach(function (pedal) {
            $http.get(config.apiURL + config.pedals + pedal._id)
              .success(function (response) {
                var item = {
                  _id: response._id,
                  name: response.name,
                  description: response.description
                };
                var users = response.users;

                // Pour chaque utilisateur de la pédale
                users.forEach(function (user) {
                  $http.get(config.apiURL + config.users + user._id)
                    .success(function (response) {
                      user.email = response.email;
                    })
                    .error(function (response) {

                    });
                });
                item.users = users;

                // TODO : Rating

                $scope.user.pedals.push(item);
              }).error(function (response) {
            });
          });

          var shared = $scope.user.shared;
          $scope.user.shared = [];
          // Pour chaque pédale partagée
          shared.forEach(function (pedal) {
            $http.get(config.apiURL + config.pedals + pedal._id)
              .success(function (response) {
                var item = {
                  _id: response._id,
                  name: response.name,
                  description: response.description
                };
                var users = response.users;
                // Pour chaque utilisateur de la pédale
                users.forEach(function (user) {
                  $http.get(config.apiURL + config.users + user._id)
                    .success(function (response) {
                      user.email = response.email;
                    })
                    .error(function (response) {

                    });
                });
                item.users = users;
                // TODO : Rating

                $scope.user.shared.push(item);
              }).error(function (response) {
            });
          });
        })
        .error(function (response) {

        });


      /**
       * Creation d'une nouvelle pedale
       */
      $scope.newPedal = function () {


        $scope.pedal.owner=$scope.user.id;
        $scope.pedal.user=$scope.user.id;
        $scope.pedal.effects = [];
        $scope.pedal.effects.push({data:$scope.pedal.effect});

        pedal.createPedal($scope.pedal, $scope.login).then(function () {
          console.log($scope.pedal);
          $scope.user.pedals.push($scope.pedal._id);
          $scope.pedalCreated = true;
        //  $location.path( '/pedal/'.concat($scope.pedal._id) );
        });

      };


      /**
       * shared pedals with other users
       *
       * @param id
       * @param pedal
       */
      $scope.share = function (id, pedal) {
        $http.get(config.apiURL + config.users + id)
          .then(function (response) {
            var elt = {_id: id, right: true};
            /**
             * add pedal shared into my list of pedals
             */

            /**
             * update user
             */
            $http.put(config.apiURL + config.users, response.data)
          });
      };


      $scope.switchToSignup = function () {
        $scope.created = false;
        $scope.logged = true;
      };


      // permet de hash un email
      $scope.hashEmail = function (email) {
        if (email === undefined) {
          return "";
        }
        return md5.createHash(email);
      };
  });
