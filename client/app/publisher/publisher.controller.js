'use strict';

angular.module('instantFeedApp')
  .controller('PublisherController', function ($scope, $http, socket, messageService, Lightbox) {
    var vm = this;
    vm.messages = [];

    messageService.getMessages().then(function(messages) {
      vm.messages = messages;
      socket.syncUpdates('message', vm.messages);
    });

    vm.publishMessage = function(message, image) {
      message.timePublished = new Date();
      messageService.addMessage(message, image);
    };

    vm.changeMessage = function(message, image) {
      messageService.updateMessage(message, image);
    };

    vm.openModal = function(pictureUrl) {
      Lightbox.openModal([pictureUrl], 0);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
