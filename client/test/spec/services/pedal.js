'use strict';

describe('Service: pedal', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var pedal;
  beforeEach(inject(function (_pedal_) {
    pedal = _pedal_;
  }));

  it('should do something', function () {
    expect(!!pedal).toBe(true);
  });

});
