'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, $http, Upload, socket) {
    var vm = this;
    vm.messages = [];

    $http.get('/api/messages').success(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages);
    });

    vm.imageUpload = function() {
      Upload.upload({
        url: 'http://localhost:9000/api/images',
        data: {
          file: vm.picFile
        },
        method: 'POST'
      }).then(function(response){
        console.log(response);
      });
    }

    vm.publishMessage = function() {
      if (vm.newMessage.text == '') {
        return;
      }
      vm.newMessage.timePublished = new Date();
      $http.post('/api/messages', vm.newMessage);
      vm.newMessage = {};
    };

    vm.changeMessage = function(message) {
      $http.put('/api/messages/' + message._id, message);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
