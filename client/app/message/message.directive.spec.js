'use strict';

describe('Directive: message', function () {

  // load the directive's module and view
  beforeEach(module('instantFeedApp'));
  beforeEach(module('app/message/message.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
