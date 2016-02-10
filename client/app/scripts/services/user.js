'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.user
 * @description
 * # user
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('user', function ($http, $q, $rootScope, $notification, $location, $cookies, config) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var decision = false;

    return {
      create: (function (user, redirect) {
        return $http.post(config.apiURL + config.users, user)
          .success(function (response) {
            $notification.success("Succès", "L'utilisateur " + user.username + " a bien été créé.");
            $location.path(redirect);
          })
          .error(function (response) {
            $notification.error(
              "Erreur",
              "L'utilisateur " + user.username + " n'a pas été créé (" + response.message + ")."
            );
          });

      }),
      login: function (user, redirect) {
        return $http.post(config.apiURL + config.users + config.users_auth, user)
          .success(function (response) {
            $notification.success("Succès", "Vous êtes maintenant connecté.");
            console.log(response);
            $cookies.putObject('user', {
              id: response._id,
              username: response.username,
              email: response.email
            });

            $location.path(redirect);
          })
          .error(function (response) {
            $notification.error(
              "Erreur",
              "Impossible de connecter l'utilisateur " + user.username + " (" + response.message + ")."
            );
          });
      },
      updateUser : function(user){
        console.log("####");
        console.log(user);
        console.log("####");
        return $http.put(config.apiURL + config.users +user.id, user)

      }
      //checkUser : (function(user,myPedals){
      //
      //  var deferred = $q.defer();
      //
      //    $http.post("http://localhost:3000/api/users/auth", user)
      //        .success(function(data) {
      //          $notification.success("login", "connected successfuly");
      //          $rootScope.logged = true;
      //
      //          user._id = data._id;
      //          user.pedals = data.pedals;
      //          for (var i=0 ; i < data.pedals.length; i++){
      //              $http.get("http://localhost:3000/api/pedals/"+data.pedals[i])
      //                .then(function(response){
      //                  myPedals.push(response.data);
      //
      //                });
      //          }
      //        //  myPedals.push(data.login.pedals);
      //          deferred.resolve(data);
      //
      //
      //
      //        })
      //        .error(function() {
      //          decision = false;
      //          $notification.error("login", "refused");
      //          deferred.reject(false);
      //
      //        });
      //
      //
      //
      //  return deferred.promise;
      //}),
      //turnLogged : (function(){
      //  var deferred = $q.defer();
      //  return decision;
      //})

    };
  });
