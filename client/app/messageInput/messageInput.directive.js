'use strict';

angular.module('instantFeedApp')
  .directive('messageInput', function () {
    return {
      scope: {
        submitFunction: '&',
        submitButtonText: '@',
        message: '=',
        image: '='
      },
      templateUrl: 'app/messageInput/messageInput.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
