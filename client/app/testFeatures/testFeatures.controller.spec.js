'use strict';

describe('Controller: TestFeaturesCtrl', function () {

  // load the controller's module
  beforeEach(module('instantFeedApp'));

  var TestFeaturesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestFeaturesCtrl = $controller('TestFeaturesController', {
      $scope: scope
    });
  }));

});
