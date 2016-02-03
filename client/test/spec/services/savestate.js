'use strict';

describe('Service: saveState', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var saveState;
  beforeEach(inject(function (_saveState_) {
    saveState = _saveState_;
  }));

  it('should do something', function () {
    expect(!!saveState).toBe(true);
  });

});
