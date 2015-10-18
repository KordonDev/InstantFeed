'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, $http, Upload, socket) {
    var vm = this;
    vm.messages = [];

    $http.get('/api/messages').success(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages);
    });


    vm.publishMessage = function(message, image) {
      if (image) {
        uploadImage(image)
          .then(function(response) {
            newMessage(message, response.data);
          });
      } else {
        newMessage(message);
      }
    };

    vm.changeMessage = function(message) {
      $http.put('/api/messages/' + message._id, message);
    };

    function newMessage(message, image) {
      if (image) {
        message.picture = image;
      }
      message.timePublished = new Date();
      $http.post('/api/messages', message);
    }

    function uploadImage(image) {
      return Upload.upload({
        url: 'http://localhost:9000/api/images',
        data: {
          file: image
        },
        method: 'POST',
        headers: {
          'Content-Type': image.type
        }
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
