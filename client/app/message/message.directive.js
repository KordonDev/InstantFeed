'use strict';

angular.module('instantFeedApp')
  .directive('message', function () {
    return {
      templateUrl: 'app/message/message.html',
      restrict: 'EA',
      scope: {
        message: '=messageData'
      },
      controller: function(messageService, Auth, Lightbox) {
        var vm = this;
        vm.isPublisher = Auth.isPublisher;

        vm.openModal = function(pictureUrl) {
          Lightbox.openModal([pictureUrl], 0);
        };

        vm.changeMessage = function(message, image) {
          messageService.updateMessage(message, image);
        };

        vm.deleteMessage = function(message) {
          messageService.deleteMessage(message);
        };
      },
      controllerAs: 'messageController',
      link: function (scope, element, attrs) {
      }
    };
  });
