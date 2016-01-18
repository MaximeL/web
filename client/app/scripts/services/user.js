'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.user
 * @description
 * # user
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('user', function ($http,$q , $rootScope , $notification) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var res = 0;
    return {
    	createUser : (function(user){
		    var deferred = $q.defer();
        $http.post("http://localhost:3000/api/user", user)
        console.log("user created" + user.username);
        return deferred.promise;
  		}),
      checkUser : (function(user){

        var deferred = $q.defer();
          $http.post("http://localhost:3000/api/user/auth", user)
              .success(function(data) {
                $rootScope.login._id = data._id;
                $rootScope.login.pedals = data.pedals;
                $rootScope.logged = true;
                deferred.resolve(data);
                $notification.success("login", "connected successfuly");

              })
              .error(function() {
                $notification.error("login", "refused");
                deferred.reject(false);

              });

        return deferred.promise;
      }),
      createPedale : (function(pedal){
        var deferred = $q.defer();
        $http.post("http://localhost:3000/api/pedal", pedal)
          .success(function(data) {
            deferred.resolve(data);
            $notification.success("login", "pedal created");

          })
          .error(function() {
            $notification.error("login", "");
            deferred.reject(false);
          });
        return deferred.promise;
      })

  	};
  });
