'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')

  .controller('MainCtrl', function ($scope, $rootScope, md5, NodeStorage, $http , $notification, user, pedal, $location) {

    $scope.signup = {
      username : "",
      mail : "",
      password : "",
      _id : ""

    };

    $scope.login = {
      username : "",
      password : "",
      _id : "",
      pedals : [],
      shared : [
        {
          _id: "",
          right: false
        }
      ]
    };

    $scope.pedal = {
      _id: "",
      nom: "",
      description: "",
      effets: [
        {
          type: "",
          precedent: "",
          suivant: ""
        }
      ],
      owner : "",
      users: []
    };

    $rootScope.logged = false;
    $scope.created = true;
    $scope.pedalCreated = true;
    $scope.pedalsShared = [];

    $scope.users = [];



    // permet de hash un email
    $scope.hashEmail = function(email) {
      return md5.createHash(email);
    };

    $scope.myPedals = [];
    $scope.myPedals.push(
      {
        "_id": "56a9ecead4b0c99c25e4b2df",
        "owner": "56a9ecead4b0c99c25e4b2de",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
        "name": "Ma pédale modifée",
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
        "name": "Ze mega pedale",
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



    /**
     une manière d'encrypter les données du user : nom , mot de passe , email ......
     Lien vers la personne à qui j'ai piqué le code :) : http://spaghetti.io/cont/article/angularjs-and-basic-auth/12/1.html#.VpaxtFnb_HY
     "il est open source"
     **/

    $scope._base64 = {
      _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=$scope._base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
      decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=$scope._base64._utf8_decode(t);return t},
      _utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},
      _utf8_decode:function(e){var t="";var n=0;var r=0 , c1=0,c2= 0,c3=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}
    };

    /**
     * retrieve list to all of users
     */
    $http.get("http://localhost:3000/api/users/")
      .then(function(response){
        for(var i=0; i < response.data.length ; i++)
        {
          $scope.users[i] = response.data[i];
        }
      //  console.log($scope.users[0]);
      });


    /**
     chech login befor signin
     */
    $scope.checkLogin = function(){
      $scope.login.password = $scope._base64.encode($scope.login.password);

      user.checkUser($scope.login);
      console.log("user ::::: ");
      console.log($scope.login);

    };

    /**
     create a new user and stor it in DB
     */
    $scope.createUser = function(){
      if($scope.signup.username != $scope.mail != $scope.signup.password != null){
        $scope.signup.password = $scope._base64.encode($scope.signup.password);

        user.createUser($scope.signup);

        $notification.success("signup" ,  "user : " + $scope.signup.username + " created")
      }
    };

    $scope.newPedal = function(){
      $scope.pedal.owner = $scope.users[0]._id;
      $scope.pedal.effets = undefined;
      pedal.createPedal($scope.pedal , $scope.login).then(function() {
        console.log('pedal : ');
        console.log($scope.pedal);
        $scope.myPedals.push($scope.pedal);
        user.updateUser($scope.login);
        $scope.pedalCreated = true;

     //   $location.path( '/pedal/'.concat($scope.pedal._id) );
      });
    };

    $scope.getMyPedals = function(){
      for (var i=0 ; i < $scope.login.pedals.length; i++){
        $http.get("http://localhost:3000/api/pedal/"+$scope.login.pedals[i])
          .then(function(response){
            $scope.myPedals.push(response.data);

          });
      }
    };
    /**
     * shared pedals with other users
     *
     * @param id
     * @param pedal
     */
    $scope.share = function(id , pedal){
      $http.get("http://localhost:3000/api/user/"+id)
        .then(function(response){
          var elt = {_id:id , right:true};
          /**
           * add pedal shared into my list of pedals
           */
            //response.data.pedals.push(elt);
         // console.log(response.data);
          /**
           * update user
           */
          $http.put("http://localhost:3000/api/user", response.data)
        });
    };


    $scope.switchToSignup = function(){
      $scope.created = false;
      $scope.logged = true;
    }


  });
