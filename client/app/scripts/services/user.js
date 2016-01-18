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
              .success(function() {
                $rootScope.logged = true;
                $notification.success("login", "connected successfuly");
              })
              .error(function() {
                console.log("error");
                $notification.error("login", "refused");

              });
        return deferred.promise;
      })

  	};
  });
