'use strict';

describe('Service: Tremolo', function () {

  // load the service's module
  beforeEach(module('webClientSideApp'));

  // instantiate service
  var Tremolo;
  beforeEach(inject(function (_Tremolo_) {
    Tremolo = _Tremolo_;
  }));

  it('should do something', function () {
    expect(!!Tremolo).toBe(true);
  });

});
