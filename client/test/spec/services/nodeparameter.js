'use strict';

describe('Service: NodeParameter', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var NodeParameter;
  beforeEach(inject(function (_NodeParameter_) {
    NodeParameter = _NodeParameter_;
  }));

  it('should do something', function () {
    expect(!!NodeParameter).toBe(true);
  });

});
