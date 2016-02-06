'use strict';

/**
 * Created by Romain on 04/02/2016.
 */

angular.module('webClientSideApp')
  .directive('ngMyPedals', function() {

    return {
      restrict: 'E',
      templateUrl: 'views/partials/_myPedals.html'
    };

  });
