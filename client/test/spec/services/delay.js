'use strict';

describe('Service: Delay', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Delay;
  beforeEach(inject(function (_Delay_) {
    Delay = _Delay_;
  }));

  it('should do something', function () {
    expect(!!Delay).toBe(true);
  });

});
