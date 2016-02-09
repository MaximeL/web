'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.pedal
 * @description
 * # pedal
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .service('Pedal', function ($http, $log, $q, user , $notification) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      createPedal: function (pedal) {
        return $q(function (resolve, reject) {
          $http.post("http://localhost:3000/api/pedals/", pedal)
            .success(function (data) {
              $notification.success("Pedal", "pedal created");
              resolve(data);
            })
            .error(function () {
              $log.error('post error on pedal ');
              $notification.error("Pedal", "");
              deferred.reject(false);
            })
        });
      }
    };
  });
