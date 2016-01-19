'use strict';

describe('Service: AudionodeSelector', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var AudionodeSelector;
  beforeEach(inject(function (_AudionodeSelector_) {
    AudionodeSelector = _AudionodeSelector_;
  }));

  it('should do something', function () {
    expect(!!AudionodeSelector).toBe(true);
  });

});
