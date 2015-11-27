'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, socket, messageService, topicService) {
    var vm = this;
    vm.messages = [];

    messageService.getMessages().then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, topicService.topicNameInSocket);
    });

    vm.publishMessage = function(message, image) {
      message.timePublished = new Date();
      return messageService.addMessage(message, image)
        .then(function(response) {
          return response;
        }
      );
    };

    vm.test = function() {
      console.log('hel');
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
