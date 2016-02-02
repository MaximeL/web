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
    Inputnode.prototype.ready = false;
    Inputnode.prototype.play = false;
    Inputnode.prototype.music = null;
    Inputnode.prototype.playSound = null;
    Inputnode.prototype.labelButton = 'PLAY';

    Inputnode.prototype.connect = function(output) {
      if(this.output !== null)
        this.output.connect(output.input);
      if(this.playSound !== null)
        this.playSound.connect(output.input);
      this.suivants.push(output.id);
    };
    Inputnode.prototype.disconnect = function (output) {
      if(this.output !== null)
        this.output.disconnect();
      if(this.playSound !== null)
        this.playSound.disconnect();
      this.suivants.splice(this.suivants.indexOf(output.id), 1);
    };
    Inputnode.prototype.initNode = function(audioContext) {
      this.playSound = audioContext.createBufferSource();
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

      var soundRequest = new XMLHttpRequest();
      soundRequest.open('GET', 'http://localhost:9000/sound/guitar.ogg', true);
      soundRequest.responseType = "arraybuffer";
      soundRequest.onload = function() {
        $log.info('soundRequest');
        $log.debug(soundRequest);
        var audioData = soundRequest.response;
        $log.info('audiodata');
        $log.debug(audioData);
        audioContext.decodeAudioData(audioData, function(decodedData) {
          self.playSound.buffer = decodedData;
          self.playSound.loop = true;
          self.ready = true;
          $log.info('buffer loaded');
        });
      };
      soundRequest.send();
    };
    Inputnode.prototype.buttonMusic = function() {
      if(this.ready) {
        if(this.play) {
          this.playSound.stop(0);
          this.play = false;
          this.labelButton = 'PLAY';
        } else {
          this.playSound.start(0);
          this.play = true;
          this.labelButton = 'STOP';
        }
      }
    };

    // Public API here
    return Inputnode;
  });
