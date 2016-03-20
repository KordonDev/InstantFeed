'use strict';

describe('Controller: PublisherCtrl', function () {

  // load the controller's module
  beforeEach(module('instantFeedApp'));

  var PublisherCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublisherCtrl = $controller('PublisherController', {
      $scope: scope
    });
  }));

});
