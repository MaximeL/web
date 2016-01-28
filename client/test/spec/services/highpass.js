'use strict';

describe('Service: HighPass', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var HighPass;
  beforeEach(inject(function (_HighPass_) {
    HighPass = _HighPass_;
  }));

  it('should do something', function () {
    expect(!!HighPass).toBe(true);
  });

});
