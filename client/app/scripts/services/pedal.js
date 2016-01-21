'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.pedal
 * @description
 * # pedal
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .service('pedal', function ($http, $q, $notification) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      createPedale: (function (pedal) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/api/pedal", pedal)
          .success(function (data) {
            deferred.resolve(data);
            $notification.success("login", "pedal created");

          })
          .error(function () {
            $notification.error("login", "");
            deferred.reject(false);
          });
        return deferred.promise;
      })
    };
  });
