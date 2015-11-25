'use strict';

angular.module('instantFeedApp')
  .controller('TopicController', function (topicService) {
    var vm = this;
    vm.topics = [];

    topicService.getTopics().then(function(topics) {
      vm.topics = topics;
    })
  });
