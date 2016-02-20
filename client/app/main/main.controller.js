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
        addMessagesOfTopic(topic);
        selectedTopics.push(topic._id);
      } else {
        removeMessagesOfTopic(topic);
        selectedTopics.splice(topicIndex, 1);
      }
    };

    function addMessagesOfTopic(topic) {
      Feed.messagesForTopic(topic, 0).then(function(messages) {
        messages = vm.messages.concat(messages);
        messages = Feed.sortByDateDescendend(messages);
        messages = Feed.sameTopicSideBySide(messages);
        vm.messages = messages;
      });
    }

    function removeMessagesOfTopic(topic) {
      var messages = vm.messages;
      for (var i = messages.length -1; i >= 0; i--) {
        if (messages[i].belongsTo === topic._id) {
          messages.splice(i, 1);
        }
      }
      messages = Feed.sameTopicSideBySide(messages);
      vm.messages = messages;
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
