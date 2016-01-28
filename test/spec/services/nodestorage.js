'use strict';

describe('Service: NodeStorage', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var NodeStorage;
  beforeEach(inject(function (_NodeStorage_) {
    NodeStorage = _NodeStorage_;
  }));

  it('should do something', function () {
    expect(!!NodeStorage).toBe(true);
  });

});
