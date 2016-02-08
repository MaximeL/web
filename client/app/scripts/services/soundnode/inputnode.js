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
    Inputnode.prototype.output = null;
    Inputnode.prototype.labelButton = 'PLAY';

    Inputnode.prototype.connect = function(output) {
      $log.debug('input conection');
      if(this.output !== null) {
        $log.debug('connecting output of input');
        this.output.connect(output.getInput());
      }
      if(this.playSound !== null) {
        $log.debug('connecting playSound of input on '+output.id);
        $log.debug(output);
        this.playSound.connect(output.getInput());
      }
    };
    Inputnode.prototype.disconnect = function (output) {
      if(this.output !== null)
        this.output.disconnect();
      if(this.playSound !== null)
        this.playSound.disconnect();
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
    Inputnode.prototype.getInput = function() {
      return null;
    };
    Inputnode.prototype.getOutput = function() {
      return [this.output, this.playSound];
    };

    // Public API here
    return Inputnode;
  });
