'use strict';

angular.module('instantFeedApp')
  .factory('Message', function ($resource, Upload, Topic, $q) {
    var messageService =  {
      get: getMessages,
      add: addMessage,
      update: updateMessage,
      delete: deleteMessage,
      getMessagesInTopics: getMessagesInTopics
    };

    var messageResource = $resource('/api/messages/:id/:toTopic', {id: '@_id'}, {update: {method: 'PUT'}});
    var imageResource = $resource('/api/images/');

    function getMessages() {
      return messageResource.query().$promise;
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

    return messageService;
  });
