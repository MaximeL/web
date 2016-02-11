'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.audionodeSelector
 * @description
 * # audionodeSelector
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('audionodeSelector',
    function ($log, Inputnode, Outputnode, Gain, LowPass, HighPass, BandPass, LowShelf, HighShelf, Peaking, Notch, AllPass, Convolver, Delay, Overdrive, Compressor, Tremolo) {

    // Service logic
    var selectNode = function(type) {
      if(type === 'input')
        return new Inputnode();
      if(type === 'output')
        return new Outputnode();
      if(type === 'gain')
        return new Gain();
      if(type === 'lowpass')
        return new LowPass();
      if(type === 'highpass')
        return new HighPass();
      if(type === 'bandpass')
        return new BandPass();
      if(type === 'lowshelf')
        return new LowShelf();
      if(type === 'highshelf')
        return new HighShelf();
      if(type === 'peaking')
        return new Peaking();
      if(type === 'notch')
        return new Notch();
      if(type === 'allpass')
        return new AllPass();
      if(type === 'convolver')
        return new Convolver();
      if(type === 'delay')
        return new Delay();
      if(type === 'overdrive')
        return new Overdrive();
      if(type === 'compressor')
        return new Compressor();
      if(type === 'tremolo')
        return new Tremolo();
      return null;
    };

    return {
      getAudionode: function(type) {
        return selectNode(type);
      }
    };
  });
