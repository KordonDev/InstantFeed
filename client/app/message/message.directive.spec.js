'use strict';

describe('Directive: message', function () {

  // load the directive's module and view
  beforeEach(module('instantFeedApp'));
  beforeEach(module('app/message/message.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<message></message>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the message directive');
  }));
});