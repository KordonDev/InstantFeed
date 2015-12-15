'use strict';

angular.module('instantFeedApp')
  .controller('TopicController', function ($scope, topicService, socket) {
    var vm = this;
    vm.topics = [];

    topicService.getTopics().then(function(topics) {
      vm.topics = topics;
      socket.syncUpdates('topic', vm.topics);
    });

    vm.addTopic = function(topic) {
      topic.active = true;
      topicService.save(topic);
      topic = undefined;
    };

    vm.saveTopic = function(topic) {
      topicService.update(topic);
      topic.edit = undefined;
    };

    vm.startEdit = function(topic) {
      topic.edit = true;
      topic.oldName = topic.name;
    };

    vm.cancelEdit = function(topic) {
        topic.edit = undefined;
        topic.name = topic.oldName;
    };

    vm.update = function(topic) {
      topicService.update(topic);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('topic');
    });
  });
