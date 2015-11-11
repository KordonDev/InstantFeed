'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, messageService, topicService) {
    var vm = this;
    vm.messages = [];

    messageService.getMessages().then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages, topicService.topicNameInSocket);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
