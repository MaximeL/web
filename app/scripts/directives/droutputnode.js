'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:drOutputnode
 * @description
 * # drOutputnode
 */
angular.module('webClientSideApp')
  .directive('drOutputnode', function ($log, outputnode) {
    var soundnode, audioCtx;

    return {
      template: '<div class="soundnode" id="output">' +
      '<div class="my-container">' +
      'Output' +
      '<div class="link-point link-in"></div>' +
        '</div>' +
      '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var linkOut = element.find(".link-out");
        $log.debug(linkOut);

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        soundnode = outputnode.create(audioCtx);
      }
    };
  });
