'use strict';

describe('Service: audiocontext', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var audiocontext;
  beforeEach(inject(function (_audiocontext_) {
    audiocontext = _audiocontext_;
  }));

  it('should do something', function () {
    expect(!!audiocontext).toBe(true);
  });

});
