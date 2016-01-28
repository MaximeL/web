'use strict';

describe('Service: Peaking', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Peaking;
  beforeEach(inject(function (_Peaking_) {
    Peaking = _Peaking_;
  }));

  it('should do something', function () {
    expect(!!Peaking).toBe(true);
  });

});
