'use strict';

describe('Service: Outputnode', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Outputnode;
  beforeEach(inject(function (_Outputnode_) {
    Outputnode = _Outputnode_;
  }));

  it('should do something', function () {
    expect(!!Outputnode).toBe(true);
  });

});
