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
      if (vm.newMessage.text == '') {
        return;
      }
      vm.newMessage.timePublished = new Date();
      /*var messageToSave = {
        text: vm.newMessage.text,
        timePublished: new Date(),
        belongsTo: vm.newMessage.belongsTo
      };*/
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
