'use strict';

describe('Controller: TopicCtrl', function () {

  // load the controller's module
  beforeEach(module('instantFeedApp'));

  var TopicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopicCtrl = $controller('TopicController', {
      $scope: scope
    });
  }));
});
