'use strict';

describe('Directive: messageInput', function () {

  // load the directive's module and view
  beforeEach(module('instantFeedApp'));
  beforeEach(module('app/messageInput/messageInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<message-input></message-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the messageInput directive');
  }));
});