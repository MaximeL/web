'use strict';

describe('Service: wsEffects', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var wsEffects;
  beforeEach(inject(function (_wsEffects_) {
    wsEffects = _wsEffects_;
  }));

  it('should do something', function () {
    expect(!!wsEffects).toBe(true);
  });

});
