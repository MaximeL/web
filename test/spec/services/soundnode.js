'use strict';

describe('Service: SoundNode', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var SoundNode;
  beforeEach(inject(function (_SoundNode_) {
    SoundNode = _SoundNode_;
  }));

  it('should do something', function () {
    expect(!!SoundNode).toBe(true);
  });

});
