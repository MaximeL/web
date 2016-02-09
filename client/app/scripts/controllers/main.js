'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')

  .controller('MainCtrl', function ($scope, $cookies, $rootScope, md5, NodeStorage, $http, $notification, user, pedal, $location, config) {

    if ($cookies.getObject('user') === undefined) {
      $location.path("/sign-in");
    }

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
          $http.get(config.apiURL + config.pedals + pedal)
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
        // Pour chaque pédale partagée
        shared.forEach(function (pedal) {
          $http.get(config.apiURL + config.pedals + pedal)
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
      })
      .error(function (response) {

      });


    /**
     * Creation d'une nouvelle pedale
     */
    $scope.newPedal = function () {
      console.log($scope.login);
      $scope.pedal.owner = $scope.login._id;
      $scope.pedal.effets = undefined;

      pedal.createPedal($scope.pedal, $scope.login, $scope.myPedals).then(function () {
        // console.log('pedal : ');

        $scope.login.pedals.push($scope.pedal._id);
        // $scope.myPedals.push($scope.pedal);
        // user.updateUser($scope.login);
        $scope.pedalCreated = true;


        //   $location.path( '/pedal/'.concat($scope.pedal._id) );
      });
      // console.log("~~~~~~~~~~~~~~");
      //  console.log( $scope.myPedals);
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
          //response.data.pedals.push(elt);
          // console.log(response.data);
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
      var str = md5.createHash(email);
      var url = "http://www.gravatar.com/avatar/" + str + ".jpg?s=30&d=retro";
      return url;
    };

    $scope.myPedals = [];
    $scope.myPedals.push(
      {
        "_id": "56a9ecead4b0c99c25e4b2df",
        "owner": "56a9ecead4b0c99c25e4b2de",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
        "name": "Ma pédale modifée",
        "users": [
          {"username": "Robert", "email": "truc@mail.com"},
          {"username": "Jean-henri", "email": "truc1@mail.com"},
          {"username": "Brigitte", "email": "truc2@mail.com"},
          {"username": "Jacqueline", "email": "truc3@mail.com"},
          {"username": "Micheline", "email": "truc4@mail.com"}
        ],
        "comments": [
          {
            "author": "56a9ecead4b0c99c25e4b2de",
            "_id": "56a9ecead4b0c99c25e4b2e1"
          }
        ],
        "notes": [
          {
            "author": "56a9ecead4b0c99c25e4b2de",
            "_id": "56a9ecead4b0c99c25e4b2e0"
          }
        ],
        "effets": [
          {
            "type": "aze",
            "suivant": "aze",
            "precedent": "aze"
          }
        ]
      },
      {
        "_id": "56a9CCCad4b0c99c25e4b2df",
        "owner": "56a9CCCad4b0c99c25e4b2de",
        "description": "C'est la pédale à tonton",
        "name": "Ze mega pedale",
        "users": [
          {"username": "Brigitte", "email": "truc5@mail.com"},
          {"username": "Jacqueline", "email": "truc6@mail.com"},
          {"username": "Micheline", "email": "truc7@mail.com"}
        ],
        "comments": [
          {
            "author": "56a9ecead4b0c99c25e4b2de",
            "_id": "56a9ecead4b0c99c25e4b2e1"
          }
        ],
        "notes": [
          {
            "author": "56a9ecead4b0c99c25e4b2de",
            "_id": "56a9ecead4b0c99c25e4b2e0"
          }
        ],
        "effets": [
          {
            "type": "aze",
            "suivant": "aze",
            "precedent": "aze"
          }
        ]
      }
    );


  });
