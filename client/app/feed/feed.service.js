'use strict';

angular.module('instantFeedApp')
  .factory('Feed', function (Message, Topic, webNotification, $window) {
    var feed =  {
      messagesForTopic: messagesForTopic,
      messagesForAllTopics: messagesForAllTopics,
      sameTopicSideBySide: sameTopicSideBySide,
      notify: notify
    };

    /*
    * Queries messages for the topic and sets the topic for the messages.
    */
    var messagesForTopic = function(topic) {
      return Message.getMessagesInTopics([topic], 0).then(function(messages) {
        return setTopicNameForMessages(messages);
      });
    };

    /*
    * Queries messages for all topics and skips the specified number. The messages
    * get then their topic and are checked for same topic side by side.
    */
    var messagesForAllTopics = function(topics, skip) {
      return Message.getMessagesInTopics(topics, skip).then(function(messages) {
        return setTopicNameForMessages(messages);
      }).then(function(messages) {
        return sameTopicSideBySide(messages);
      });
    };

    /*
    * Adds the name of the topic to the message. This returns a promise.
    */
    function setTopicNameForMessages(messages) {
      return Topic.getActiveTopics().then(function(topics) {
        angular.forEach(messages, function(message) {
          for (var index = 0; index < topics.length; index++) {
            if (topics[index].id === message.belongsTo) {
              message.topic = topics[index];
              break;
            }
          }
        });
        return messages;
      });
      }
    }

    /*
    * Checks if the last and next message has the same topic as the message itself
    * and sets then lastSameTopic and nextSameTopic to true.
    */
    function sameTopicSideBySide(messages) {
      for (var i = 0; i < messages.length; i++) {
        if (i > 0) {
          if (messages[i].belongsTo === messages[i-1].belongsTo) {
            messages[i].lastSameTopic = true;
          } else {
            messages[i].sameTopic = false;
          }
        }
        if (i < messages.length-1) {
          if (messages[i].belongsTo === messages[i+1].belongsTo) {
            messages[i].nextSameTopic = true;
          } else {
            messages[i].nextSameTopic = false;
          }
        }
      }
      return messages;
    }

    /*
    * Sends a notification to the client.
    */
    function notify(message) {
      webNotification.showNotification(message.headline, {
        body: message.text,
        icon: 'favicon.ico',
        onClick: function onNotificationClicked() {
          $window.location.hash = message._id;
          $window.focus();
        },
        autoClose: 10000
      }, function onShow(error) {
        if (error) {
          alert('Unable to show notification: ' + error.message);
        }
      });
    }

    return feed;
  });
