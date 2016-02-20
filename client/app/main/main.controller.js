'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, Message, Topic, Feed, $cookieStore) {
    var vm = this;
    vm.messages = [];
    vm.topics = [];
    var selectedTopics = $cookieStore.get('selectedTopics') ? $cookieStore.get('selectedTopics') : [];

    Topic.getActiveTopics().then(function(topics) {
      for (var i = 0; i < topics.length; i++) {
        if (selectedTopics.indexOf(topics[i]._id) !== -1) {
          topics[i].selected = true;
        }
      }
      vm.topics = topics;
    });

    Feed.messagesForAllTopics(selectedTopics).then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, addMessageToFeed);
    });

    vm.toggleTopic = function(topic) {
      var topicIndex = selectedTopics.indexOf(topic._id);
      if (topicIndex === -1) {
        topic.selected = true;
        addMessagesOfTopic(topic);
        selectedTopics.push(topic._id);
      } else {
        removeMessagesOfTopic(topic);
        topic.selected = false;
        selectedTopics.splice(topicIndex, 1);
      }
      $cookieStore.put('selectedTopics', selectedTopics);
    };

    /*
    * Adds the message to the feed, if its topic is in the selectedTopics. And
    * notifies the user.
    */
    function addMessageToFeed(event, message, array) {
      if (selectedTopics.indexOf(message.belongsTo) !== -1) {
        var messages = vm.messages;
        Feed.setTopicNameForMessages([message])
        .then(function(message) {
          message = message[0];
          messages.unshift(message);
          vm.messages = Feed.sameTopicSideBySide(messages);
          Feed.notify(message);
        });
      }
    }

    /*
    * Adds messages for a topic to vm.messages. These messages are sorted and checked, which
    * messages are side by side with the same topic.
    */
    function addMessagesOfTopic(topic) {
      Feed.messagesForTopic(topic, 0).then(function(messages) {
        messages = vm.messages.concat(messages);
        messages = Feed.sortByDateDescendend(messages);
        vm.messages = Feed.sameTopicSideBySide(messages);
      });
    }

    /*
    * Removes all messages from vm.messages of the topic in the argument. For these messages
    * it is checked which messages are side by side with the same topic.
    */
    function removeMessagesOfTopic(topic) {
      var messages = vm.messages;
      for (var i = messages.length -1; i >= 0; i--) {
        if (messages[i].belongsTo === topic._id) {
          messages.splice(i, 1);
        }
      }
      vm.messages = Feed.sameTopicSideBySide(messages);
    }

    /*
    * Ends the syncing with new messages.
    */
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
