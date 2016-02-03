'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.pedal
 * @description
 * # pedal
 * Service in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .service('pedal', function ($http, $log, $q, user , $notification) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      createPedal: (function (pedal , u) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/api/pedal/", pedal)
          .success(function (data) {
            $log.info('post success on pedal : ');
            $log.debug(data);
            pedal._id = data._id;
            u.pedals.push(data._id);
            user.updateUser(u);
            deferred.resolve(data);
            $notification.success("Pedal", "pedal created");
          })
          .error(function () {
            $log.error('post error on pedal ');
            $notification.error("Pedal", "");

            deferred.reject(false);
          });
        return deferred.promise;
      })
    };
  });
