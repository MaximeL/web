'use strict';

describe('Service: LowPass', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var LowPass;
  beforeEach(inject(function (_LowPass_) {
    LowPass = _LowPass_;
  }));

  it('should do something', function () {
    expect(!!LowPass).toBe(true);
  });

});
