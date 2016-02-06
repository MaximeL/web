'use strict';

describe('Service: InitInput', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var InitInput;
  beforeEach(inject(function (_InitInput_) {
    InitInput = _InitInput_;
  }));

  it('should do something', function () {
    expect(!!InitInput).toBe(true);
  });

});
