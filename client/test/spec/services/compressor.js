'use strict';

describe('Service: compressor', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var compressor;
  beforeEach(inject(function (_compressor_) {
    compressor = _compressor_;
  }));

  it('should do something', function () {
    expect(!!compressor).toBe(true);
  });

});
