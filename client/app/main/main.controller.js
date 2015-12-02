'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, messageService, topicService) {
    var vm = this;
    vm.messages = [];

    messageService.getMessages().then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, getTopicsAndNotify);
    });

    var getTopicsAndNotify = function(event, message, array) {
      if (event === 'created' || event === 'updated') {
        topicService.topicNameInSocket(event, message, array);
        messageService.notify(message);
      }
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
