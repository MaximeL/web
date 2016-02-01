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

    Inputnode.prototype.connect = function(output) {
      this.output.connect(output.input);
      this.playSound.connect(output.input);
      this.suivants.push(output.id);
    };
    Inputnode.prototype.disconnect = function (output) {
      this.output.disconnect();
      this.playSound.disconnect();
      this.suivants.splice(this.suivants.indexOf(output.id), 1);
    };
    Inputnode.prototype.initNode = function(audioContext) {
      this.ready = false;
      this.play = false;
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
      this.music;
      var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
      getSound.open("GET", "sound/Aerosmith__Cryin.mp3", true); // Path to Audio File
      getSound.responseType = "arraybuffer"; // Read as Binary Data
      getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer){
          self.music = buffer;
          self.ready = true;
        });
      };
      getSound.send();
    };
    Inputnode.prototype.buttonMusic = function() {
      if(this.ready) {
        if(this.play) {
          this.playSound.stop(0);
        } else {
          this.playSound.buffer = this.music;
          this.playSound.start(0);
        }
      }
    };

    // Public API here
    return Inputnode;
  });
