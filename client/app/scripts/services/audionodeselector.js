'use strict';

/**
 * @ngdoc service
 * @name webClientSideApp.audionodeSelector
 * @description
 * # audionodeSelector
 * Factory in the webClientSideApp.
 */
angular.module('webClientSideApp')
  .factory('audionodeSelector', function ($log, Inputnode, Outputnode, Gain, LowPass, HighPass) {
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
      return null;
    };

    return {
      getAudionode: function(type) {
        /*$log.debug('in audioselector');
        $log.debug(new Inputnode());
        $log.debug(new Outputnode());*/
        return selectNode(type);
      }
    };
  });
