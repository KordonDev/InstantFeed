'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, Message, Topic, Feed, $cookieStore) {
    var vm = this;
    vm.messages = [];
    vm.topics = [];
    var selectedTopics = $cookieStore.get('selectedTopics') ? $cookieStore.get('selectedTopics') : [];

    /*
    * Loads all active topics and saves them to the controller object.
    */
    Topic.getActiveTopics().then(function(topics) {
      for (var i = 0; i < topics.length; i++) {
        if (selectedTopics.indexOf(topics[i]._id) !== -1) {
          topics[i].selected = true;
        }
      }
      vm.topics = topics;
    });

    /*
    * Loads all messages for the selected topics and syncs the messages with the backend
    * over websockets.
    */
    Feed.messagesForAllTopics(selectedTopics).then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, addMessageToFeed);
    });

    /*
    * Selects an unselected topic and adds the messages to the feed. If the topic is
    * selected, the topic becomes unselected and the messages are removed from the feed.
    */
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
    * Loads the next messages for the feed, if not the last message was empty and
    * no request is send and has not responded.
    */
    var promiseComplete = true;
    var allMessagesLoaded = false;
    vm.loadMoreMessages = function() {
      if (vm.messages.length > 0 && promiseComplete && !allMessagesLoaded) {
        promiseComplete = false;
        Feed.messagesForAllTopics(selectedTopics, vm.messages.length)
        .then(function(newMessages) {
          if (newMessages.length === 0) {
            allMessagesLoaded = true;
          }
          promiseComplete = true;
          return Feed.setTopicNameForMessages(newMessages);
        })
        .then(function(messages) {
          messages = vm.messages.concat(messages);
          messages = Feed.sortByDateDescendend(messages);
          vm.messages = Feed.sameTopicSideBySide(messages);
        });
      }
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
          var messageTwice = messages.indexOf(message, 1);
          if (messageTwice > -1) {
            messages.splice(messageTwice, 1);
          }
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
