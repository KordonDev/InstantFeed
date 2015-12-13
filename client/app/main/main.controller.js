'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, socket, Message) {
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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
