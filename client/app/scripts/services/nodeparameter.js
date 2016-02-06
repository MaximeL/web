'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.NodeParameter
 * @description
 * # NodeParameter
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('NodeParameter', function () {
    // Service logic
    function NodeParameter() {}

    NodeParameter.prototype.name = null;
    NodeParameter.prototype.min = null;
    NodeParameter.prototype.max = null;
    NodeParameter.prototype.step = null;

    // Public API here
    return NodeParameter;
  });
