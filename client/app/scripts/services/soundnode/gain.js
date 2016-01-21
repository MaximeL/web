'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.SoundNode/Gain
 * @description
 * # SoundNode/Gain
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('Gain', function ($log, AbstractSoundnode) {
    // Service logic
    function Gain() {}
    Gain.prototype = Object.create(AbstractSoundnode.prototype);

    Gain.prototype.type = 'gain';

    Gain.prototype.initNode = function(audioContext) {
      var self = this;
      navigator.getUserMedia(
        {audio: true},
        function(stream) {
          self.output = audioContext.createMediaStreamSource(stream);
        },
        function(err) {
          console.log('The following gUM error occured: ' + err);
        }
      );
    };

    // Public API here
    return Gain;
  });
