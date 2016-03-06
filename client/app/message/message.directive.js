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

        vm.openModal = function(message) {
          Lightbox.openModal([{'caption': message.headline, 'url': message.picture}], 0);
        };

        vm.changeMessage = function(message, image) {
          return Message.update(message, image);
        };

        vm.deleteMessage = function(message) {
          Message.delete(message);
        };

        vm.postedTimeAgo = function(message) {
          var now = new Date();
          var timePublished = new Date(message.timePublished);
          var minutesSincePost = Math.floor((now.getTime() - timePublished.getTime()) / 60000);
          if (minutesSincePost < 1) { //last minute
            return 'less than 1 minute ago';
          }
          if (minutesSincePost < 60) { //last hour
            return minutesSincePost+1 + ' minutes ago';
          }
          if (minutesSincePost < 1440) { //last 24 hours
            return timePublished.toString('HH:mm');
          }
          return timePublished.toString('HH:mm dd.MM.yy');
        };
      },
      controllerAs: 'messageController',
      link: function (scope, element, attrs) {
      }
    };
  });
