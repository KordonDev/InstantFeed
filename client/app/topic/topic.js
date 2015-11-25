'use strict';

angular.module('instantFeedApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('topic', {
        url: '/topic',
        templateUrl: 'app/topic/topic.html',
        controller: 'TopicController as topicController'
      });
  });
