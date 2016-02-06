'use strict';

describe('Service: Distorsion', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Distorsion;
  beforeEach(inject(function (_Distorsion_) {
    Distorsion = _Distorsion_;
  }));

  it('should do something', function () {
    expect(!!Distorsion).toBe(true);
  });

});
