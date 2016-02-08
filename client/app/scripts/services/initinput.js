'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.InitInput
 * @description
 * # InitInput
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('InitInput', function ($log, $q, $http, audiocontext, config) {

    // Public API here
    return {
      getMediaInput: function() {
        return $q(function(resolve, reject) {
          navigator.getUserMedia(
            {audio: true},
            function(stream) {
              $log.info('output from node input created');
              resolve(audiocontext.get().createMediaStreamSource(stream));
            },
            function(err) {
              $log.error('The following gUM error occured: ' + err);
              reject(err);
            });
        });
      },
      getMediaPlaySound: function() {
        return $q(function(resolve, reject) {
          var result = audiocontext.get().createBufferSource();
          var soundRequest = new XMLHttpRequest();
          soundRequest.open('GET', config.apiURL+ config.samples+'aerosmith/dream_on/guitar.ogg', true);
          soundRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
          soundRequest.setRequestHeader('Access-Control-Allow-Methods', 'ANY');
          soundRequest.responseType = "arraybuffer";
          soundRequest.onload = function() {
            $log.info('loading guitar');
            $log.debug(soundRequest.response);
            var audioData = soundRequest.response;
            audiocontext.get().decodeAudioData(audioData, function(decodedData) {
              $log.info('decoding successful');
              result.buffer = decodedData;
              result.loop = true;
              resolve(result, decodedData);
            });
          };
          soundRequest.send();
        });
      }
    };
  });
