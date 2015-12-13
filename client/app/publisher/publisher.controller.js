'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, socket, Message, topicService) {
    var vm = this;
    vm.messages = [];

    Message.get().then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, formatMessages);
    });

    function formatMessages(event, message, array) {
      Message.format(event, message, array);
      vm.messages = Message.sortAndCheckTopic(array);
    }

    vm.publishMessage = function(message, image) {
      message.timePublished = new Date();
      return Message.add(message, image)
        .then(function(response) {
          return response;
        }
      );
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
