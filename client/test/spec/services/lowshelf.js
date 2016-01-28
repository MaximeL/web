'use strict';

describe('Service: LowShelf', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var LowShelf;
  beforeEach(inject(function (_LowShelf_) {
    LowShelf = _LowShelf_;
  }));

  it('should do something', function () {
    expect(!!LowShelf).toBe(true);
  });

});
