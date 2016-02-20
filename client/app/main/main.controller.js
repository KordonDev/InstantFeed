'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, Message, Topic, Feed) {
    var vm = this;
    vm.messages = [];
    vm.topics = [];
    var selectedTopics = ['56892cd51e7685b1169f7f62'];

    Topic.getActiveTopics().then(function(topics) {
      vm.topics = topics;
    });

    Feed.messagesForAllTopics(selectedTopics).then(function(messages) {
      vm.messages = messages;
    });
    socket.syncUpdates('message', vm.messages, formatMessages);

    function formatMessages(event, message, array) {
      Message.format(event, message, array);
      vm.messages = Message.sortAndCheckTopic(array);
    }

    vm.toggleTopic = function(topic) {
      var topicIndex = selectedTopics.indexOf(topic._id);
      if (topicIndex === -1) {
        selectedTopics.push(topic._id);
      } else {
        selectedTopics.splice(topicIndex, 1);
      }
      Feed.messagesForTopic(topic, 0).then(function(messages) {
        messages = vm.messages.concat(messages);
        messages = Feed.sortByDateDescendend(messages);
        messages = Feed.sameTopicSideBySide(messages);
        vm.messages = messages;
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
