'use strict';

/**
 * @ngdoc directive
 * @name webClientSideApp.directive:Inputnode
 * @description
 * # Inputnode
 */
angular.module('webClientSideApp')
  .directive('drInputnode', function ($log, inputnode) {
    var soundnode, audioCtx;

    return {
      template: '<div class="soundnode" id="input">' +
      '<div class="my-container">' +
      'Input' +
      '<div class="link-point link-out"></div>' +
      '</div>' +
      '</div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var linkOut = element.find(".link-out");
        $log.debug(linkOut);

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

          console.log('getUserMedia supported.');
          navigator.getUserMedia(
            {audio: true},
            function(stream) {
              soundnode = inputnode.create(audioCtx, stream);
            },
            function(err) {
              console.log('The following gUM error occured: ' + err);
            }
          );
      }
    }
  });
