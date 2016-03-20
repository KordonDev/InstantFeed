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

    /*
    * Loads messages and skips the first 'skip' messages
    */
    function getMessages(skip) {
      return messageResource.query({skip: skip}).$promise;
    }

    /*
    * Loads messages from some topics and skips the first 'skip' messages.
    */
    function getMessagesInTopics(topics, skip) {
      return messageResource.query({toTopic: 'toTopic', topics: JSON.stringify(topics), skip:skip}).$promise;
    }

    /*
    * Saves a message on the server. If the messages has an image, the image is saved first and the id added
    * to the message.
    */
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

    /*
    * Updates a message. If the picture is deleted, the picture id is deleted in the message.
    * If a new picture is added, the id of the picture is added to the message.
    */
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

    /*
    * Removes a message.
    */
    function deleteMessage(message) {
      return messageResource.delete({id:message._id}).$promise;
    }

    /*
    * Uploads the image and sets the id to message.picture.
    */
    function uploadImageAndUpdateMessage(message, image) {
      uploadImage(image)
        .then(function(response) {
          message.picture = response.data;
          return messageResource.update(message);
        });
    }

    /*
    * Uploads the image and returns the response.
    */
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
