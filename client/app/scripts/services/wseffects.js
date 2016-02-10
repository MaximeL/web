'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.wsEffects
 * @description
 * # wsEffects
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('wsEffects', function ($http, $log, $q, $cookies, $notification) {
    // Service logic
    var baseUrl = 'http://localhost:3000/api/pedals/';

    var getEffects = function(id) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: baseUrl + id,
           dataType: 'json',
           headers: {
           'Content-Type':'application/json'
           }
        }).then(function (response) {
            $log.info('wsEffects : get effect succes : ');
            $log.info(response);
            resolve(response.data);
          },
          function (response) {
            $log.error('wsEffects : get request on effect failed : ');
            $log.error(response);
            $notification.error("Pedal", "");
            reject();
          });
      });
    };

    var putEffects = function(data, id) {
      var user = $cookies.getObject('user');
      data.user = user.id;
      $http.put(baseUrl+id, data).then(function(response) {
        $log.info('wsEffects : put succesful : ');
        $log.debug(response);
      }, function(response) {
        $log.error('wsEffects : put error : ');
        $log.debug(response);
      });
    };

    // Public API here
    return {
      get: function (id) {
        return getEffects(id);
      },
      put: function (data, id) {
        return putEffects(data, id);
      }
    };
  });
