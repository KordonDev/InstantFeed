'use strict';

angular.module('instantFeedApp')
  .factory('Message', function ($resource, Upload, Topic, webNotification, $window, $filter, socket, $q) {
    var messageService =  {
      get: getMessages,
      add: addMessage,
      update: updateMessage,
      delete: deleteMessage,
      format: format,
      sortAndCheckTopic: sortAndCheckTopic,
      getMessagesInTopics: getMessagesInTopics
    };

    var messageResource = $resource('/api/messages/:id/:toTopic', {id: '@_id'}, {update: {method: 'PUT'}});
    var imageResource = $resource('/api/images/');

    function getMessages() {
      return messageResource.query().$promise
        .then(function(messages) {
          if (messages) {
            return format('all', null, messages);
          }
          return [];
        });
    }

    function getMessagesInTopics(topics, skip) {
      return messageResource.query({toTopic: 'toTopic', topics: JSON.stringify(topics), skip:skip}).$promise;
    }

    function addMessage(message, image) {
      if (message.belongsTo) {
        if (image) {
          return uploadImage(image)
            .then(function(response) {
              message.picture = response.data;
              return messageResource.save(message).$promise;
            });
        } else {
          return messageResource.save(message).$promise;
        }
      }
    }

    function updateMessage(message, image) {
      return Topic.topicExistsAndIsAcitve(message.belongsTo).then(function() {
        if (message.removePicture) {
          return imageResource.delete({imagePath: message.picture}).$promise
            .then(function() {
              message.picture = '';
              if (image) {
                return uploadImageAndUpdateMessage(message, image);
              }
              return messageResource.update(message);
            });
        }
        if (image) {
          return uploadImageAndUpdateMessage(message, image);
        }
        return messageResource.update(message);
      });
    }

    function deleteMessage(message) {
      return messageResource.delete({id:message._id}).$promise;
    }

    function format(event, message, messages) {
      if (event === 'created' || event === 'updated') {
        Topic.setTopicName(message);
        notify(message);
      }
      if (event === 'all') {
        angular.forEach(messages, function(message) {
          Topic.setTopicName(message);
        });
        return sortAndCheckTopic(messages);
      }
    }

    function uploadImageAndUpdateMessage(message, image) {
      uploadImage(image)
        .then(function(response) {
          message.picture = response.data;
          return messageResource.update(message);
        });
    }

    function uploadImage(image) {
      return Upload.upload({
        url: '/api/images',
        data: {
          file: image
        },
        method: 'POST',
        headers: {
          'Content-Type': image.type
        }
      });
    }



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

    function sortAndCheckTopic(messages) {
      var orderByDate = $filter('orderBy');
      messages = orderByDate(messages, 'timePublished').reverse();
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

    return messageService;
  });
