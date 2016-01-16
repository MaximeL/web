'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.user
 * @description
 * # user
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('user', function ($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
    	createUser : (function(user){
		    var deferred = $q.defer();
		      $http.post("http://localhost:3000/api/user", user)
          console.log("user created" + user.username);
		      return deferred.promise;
  		})
  	};
  });
