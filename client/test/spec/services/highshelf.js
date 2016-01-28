'use strict';

describe('Service: HighShelf', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var HighShelf;
  beforeEach(inject(function (_HighShelf_) {
    HighShelf = _HighShelf_;
  }));

  it('should do something', function () {
    expect(!!HighShelf).toBe(true);
  });

});
