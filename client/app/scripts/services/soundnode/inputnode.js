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
  .factory('Inputnode', function ($http, $log, AbstractSoundnode) {
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
    };
    Inputnode.prototype.buttonMusic = function() {
      if(this.ready) {
        if(this.play) {
          this.labelButton = 'PLAY';
          this.playSound.stop(0);
          this.play = false;
        } else {
          this.labelButton = 'STOP';
          this.playSound.start(0);
          this.play = true;
        }
      }
    };

    // Public API here
    return Inputnode;
  });
