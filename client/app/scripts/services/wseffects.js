'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.wsEffects
 * @description
 * # wsEffects
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('wsEffects', function ($http, $log) {
    // Service logic
    var baseUrl = 'http://localhost:3000/api/pedal/';

    var geteffects = function() {
      return $http({
        method : 'GET',
        url : baseUrl/*,
        dataType: 'json',
        headers: {
          'Content-Type':'application/json'
        }*/
      });
    };

    var postEffects = function(data) {

    };

    // Public API here
    return {
      get: function () {
        return geteffects();
      }
    };
  });
