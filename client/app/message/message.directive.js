'use strict';

angular.module('instantFeedApp')
  .directive('message', function () {
    return {
      templateUrl: 'app/message/message.html',
      restrict: 'EA',
      scope: {
        message: '=messageData'
      },
      controller: function(Message, Auth, Lightbox) {
        var vm = this;
        vm.isPublisher = Auth.isPublisher;

        vm.openModal = function(pictureUrl) {
          Lightbox.openModal([pictureUrl], 0);
        };

        vm.changeMessage = function(message, image) {
          Message.update(message, image);
        };

        vm.deleteMessage = function(message) {
          Message.delete(message);
        };
      },
      controllerAs: 'messageController',
      link: function (scope, element, attrs) {
      }
    };
  });
