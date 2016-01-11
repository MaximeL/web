'use strict';

describe('Directive: Inputnode', function () {

  // load the directive's module
  beforeEach(module('webClientSideApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-inputnode></-inputnode>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Inputnode directive');
  }));
});
