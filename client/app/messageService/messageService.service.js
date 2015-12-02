'use strict';

angular.module('instantFeedApp')
  .factory('messageService', function ($resource, Upload, topicService, webNotification) {
    var messageService =  {
      getMessages: getMessages,
      addMessage: addMessage,
      updateMessage: updateMessage,
      deleteMessage: deleteMessage,
      notify: notify
    };

    var messageResource = $resource('/api/messages/:id', {id: '@_id'}, {update: {method: 'PUT'}});
    var imageResource = $resource('/api/images/');

    function getMessages(){
      return messageResource.query().$promise
        .then(function(result) {
          if (result && result) {
            for(var i in result) {
              (function(i) {
                if (result[i].belongsTo) {
                  topicService.get(result[i].belongsTo).then(function(topic) {
                    result[i].belongsToName = topic.name;
                  });
                }
              })(i);
            }
            return result;
          }
          return [];
        });
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
      topicService.topicExistsAndIsAcitve(message.belongsTo).then(function() {
        if (message.removePicture) {
          imageResource.delete({imagePath: message.picture}).$promise
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

    function deleteMessage(message) {
      return messageResource.delete({id:message._id}).$promise;
    }

    function notify(message) {
      webNotification.showNotification(message.headline, {
        body: message.text,
        icon: 'favicon.ico',
      /*  onClick: function onNotificationClicked() {
            console.log('Notification clicked.');
        },*/
        autoClose: 10000
      }, function onShow(error) {
        if (error) {
          console.error('Unable to show notification: ' + error.message);
        }
      });
    }

    return messageService;
  });
