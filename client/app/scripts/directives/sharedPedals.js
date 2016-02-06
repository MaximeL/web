'use strict';

/**
 * Created by Romain on 04/02/2016.
 */

angular.module('webClientSideApp')
  .directive('ngSharedPedals', function() {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/_sharedPedals.html'
    };

  });
