'use strict';

describe('Service: AllPass', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var AllPass;
  beforeEach(inject(function (_AllPass_) {
    AllPass = _AllPass_;
  }));

  it('should do something', function () {
    expect(!!AllPass).toBe(true);
  });

});
