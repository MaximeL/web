'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.pedal
 * @description
 * # pedal
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .service('pedal', function ($http, $q, user , $notification) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      createPedal: (function (pedal , u) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/api/pedal/", pedal)
          .success(function (data) {
            pedal._id = data._id;
            u.pedals.push(data._id);
            user.updateUser(u);
            deferred.resolve(data);
            $notification.success("Pedal", "pedal created");
          })
          .error(function () {
            $notification.error("Pedal", "");

            deferred.reject(false);
          });
        return deferred.promise;
      })
    };
  });
