'use strict';

describe('Directive: messageInput', function () {

  // load the directive's module and view
  beforeEach(module('instantFeedApp'));
  beforeEach(module('app/messageInput/messageInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
