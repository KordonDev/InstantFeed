'use strict';

describe('Directive: topPosition', function () {

  // load the directive's module
  beforeEach(module('instantFeedApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<top-position></top-position>');
    element = $compile(element)(scope);
  }));
});
