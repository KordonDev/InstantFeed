'use strict';

angular.module('instantFeedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('testFeatures', {
        url: '/testFeatures',
        templateUrl: 'app/testFeatures/testFeatures.html',
        controller: 'TestFeaturesController as testFeatures'
      });
  });
