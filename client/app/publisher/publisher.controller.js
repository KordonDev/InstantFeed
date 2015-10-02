'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, $http, socket) {
    var vm = this;
    vm.messages = [];

    $http.get('/api/messages').success(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages);
    });

    vm.publishMessage = function() {
      if (vm.newMessage.name == '') {
        return;
      }
      $http.post('/api/messages', { name: vm.newMessage.name });
      vm.newMessage.name = '';
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
