'use strict';

angular.module('instantFeedApp')
  .directive('messageInput', function () {
    return {
      scope: {
        submitFunction: '&',
        submitButtonText: '@',
        message: '=messageData',
        image: '='
      },
      templateUrl: 'app/messageInput/messageInput.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
