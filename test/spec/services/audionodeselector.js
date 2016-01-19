'use strict';

describe('Service: audionodeSelector', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var audionodeSelector;
  beforeEach(inject(function (_audionodeSelector_) {
    audionodeSelector = _audionodeSelector_;
  }));

  it('should do something', function () {
    expect(!!audionodeSelector).toBe(true);
  });

});
