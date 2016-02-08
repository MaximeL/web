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
    var decision = false;

    return {
    	createUser : (function(user){
		    var deferred = $q.defer();

        $http.post("http://localhost:3000/api/users", user)
        return deferred.promise;
  		}),
      updateUser : (function(user){
		    var deferred = $q.defer();

        $http.post("http://localhost:3000/api/users", user)
        return deferred.promise;
  		}),
      checkUser : (function(user){

        var deferred = $q.defer();

          $http.post("http://localhost:3000/api/users/auth", user)
              .success(function(data) {

                $rootScope.logged = true;
                console.log(data);
                console.log("success");
                user._id = data._id;
                deferred.resolve(data);
                $notification.success("login", "connected successfuly");


              })
              .error(function() {
                decision = false;
                $notification.error("login", "refused");
                deferred.reject(false);

              });



        return deferred.promise;
      }),
      turnLogged : (function(){
        var deferred = $q.defer();
        return decision;
      })

  	};
  });
