'use strict';

describe('Service: Notch', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Notch;
  beforeEach(inject(function (_Notch_) {
    Notch = _Notch_;
  }));

  it('should do something', function () {
    expect(!!Notch).toBe(true);
  });

});
