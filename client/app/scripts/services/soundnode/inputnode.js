'use strict';

/**
 * Input node that take a recording device as input
 * @ngdoc service
 * @name webClientSideApp.Inputnode
 * @description
 * # Inputnode
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Inputnode', function ($log, AbstractSoundnode) {
    // Service logic
    function Inputnode() {}
    Inputnode.prototype = Object.create(AbstractSoundnode.prototype);

    Inputnode.prototype.type = 'input';

    Inputnode.prototype.initNode = function(audioContext) {
      var self = this;
      navigator.getUserMedia(
        {audio: true},
        function(stream) {
          $log.info('output from node input created');
          self.output = audioContext.createMediaStreamSource(stream);
        },
        function(err) {
          console.log('The following gUM error occured: ' + err);
        }
      );
    };

    // Public API here
    return Inputnode;
  });
