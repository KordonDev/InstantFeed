'use strict';

angular.module('instantFeedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publisher', {
        url: '/publisher',
        templateUrl: 'app/publisher/publisher.html',
        controller: 'PublisherController as publisher'
      });
  });
