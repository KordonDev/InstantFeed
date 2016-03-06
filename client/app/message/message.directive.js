'use strict';

angular.module('instantFeedApp')
  .directive('message', function () {
    return {
      templateUrl: 'app/message/message.html',
      restrict: 'EA',
      scope: {
        message: '=messageData'
      },
      controller: function($scope, Message, Auth, Lightbox, $timeout) {
        var vm = this;

        /*
        * Watches if the message changes and stores the new message in the vm and
        * calculates new time sice posted.
        */
        $scope.$watch('$scope.message', function(newValue, oldValue) {
          vm.message = $scope.message;
          postedTimeAgo();
        });
        vm.message = $scope.message;
        vm.timeSincePublished = null;
        postedTimeAgo();

        /*
        * Checks if a logged in user has the role publisher.
        */
        vm.isPublisher = Auth.isPublisher;

        /*
        * Opens an modal with the picture in big size.
        */
        vm.openModal = function(message) {
          Lightbox.openModal([{'caption': message.headline, 'url': message.picture}], 0);
        };

        /*
        * Sends the changes for a message to the server and saves them there.
        */
        vm.changeMessage = function(message, image) {
          return Message.update(message, image);
        };

        /*
        * Deletes a messages at the server.
        */
        vm.deleteMessage = function(message) {
          Message.delete(message);
        };

        /*
        * Calculates the time since the message was published and returns a depending message.
        */
        function postedTimeAgo() {
          var now = new Date();
          var timePublished = new Date(vm.message.timePublished);
          var minutesSincePost = Math.floor((now.getTime() - timePublished.getTime()) / 60000);
          if (minutesSincePost < 1) { //last minute
            $timeout(function () {
              postedTimeAgo();
            }, 30*1000);
            vm.timeSincePublished = 'less than 1 minute ago';
          } else if (minutesSincePost < 60) { //last hour
            $timeout(function () {
              postedTimeAgo();
            }, 30*1000);
            vm.timeSincePublished = minutesSincePost+1 + ' minutes ago';
          } else if (minutesSincePost < 1440) { //last 24 hours
            vm.timeSincePublished = timePublished.toString('HH:mm');
          } else {
            vm.timeSincePublished = timePublished.toString('HH:mm dd.MM.yy');
          }
        }
      },
      controllerAs: 'messageController',
      link: function (scope, element, attrs) {
      }
    };
  });
