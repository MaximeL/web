'use strict';

describe('Service: BandPass', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var BandPass;
  beforeEach(inject(function (_BandPass_) {
    BandPass = _BandPass_;
  }));

  it('should do something', function () {
    expect(!!BandPass).toBe(true);
  });

});
