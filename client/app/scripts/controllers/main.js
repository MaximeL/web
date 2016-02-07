'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('MainCtrl', function ($scope, md5, NodeStorage) {

    $scope.myPedals = [];
    $scope.sharedPedals = [];

    // permet de hash un email
    $scope.hashEmail = function(email) {
      return md5.createHash(email);
    };

    $scope.myPedals.push(
      {
        "_id": "56a9ecead4b0c99c25e4b2df",
        "owner": "56a9ecead4b0c99c25e4b2de",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
        "nom": "Ma pédale modifée",
        "users": [
          {"username": "Robert",     "email": "truc@mail.com"},
          {"username": "Jean-henri", "email": "truc1@mail.com"},
          {"username": "Brigitte",   "email": "truc2@mail.com"},
          {"username": "Jacqueline", "email": "truc3@mail.com"},
          {"username": "Micheline",  "email": "truc4@mail.com"}
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
        "nom": "Ze mega pedale",
        "users": [
          {"username": "Brigitte",   "email": "truc5@mail.com"},
          {"username": "Jacqueline", "email": "truc6@mail.com"},
          {"username": "Micheline",  "email": "truc7@mail.com"}
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
