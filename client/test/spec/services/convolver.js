'use strict';

describe('Service: Convolver', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Convolver;
  beforeEach(inject(function (_Convolver_) {
    Convolver = _Convolver_;
  }));

  it('should do something', function () {
    expect(!!Convolver).toBe(true);
  });

});
