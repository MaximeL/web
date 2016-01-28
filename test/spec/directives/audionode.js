'use strict';

describe('Directive: audioNode', function () {

  // load the directive's module
  beforeEach(module('webClientSideApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<audio-node></audio-node>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the audioNode directive');
  }));
});
