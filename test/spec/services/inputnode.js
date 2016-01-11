'use strict';

describe('Service: Inputnode', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Inputnode;
  beforeEach(inject(function (_Inputnode_) {
    Inputnode = _Inputnode_;
  }));

  it('should do something', function () {
    expect(!!Inputnode).toBe(true);
  });

});
