'use strict';

describe('Directive: drOutputnode', function () {

  // load the directive's module
  beforeEach(module('webClientSideApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dr-outputnode></dr-outputnode>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the drOutputnode directive');
  }));
});
