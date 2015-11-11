'use strict';

angular.module('instantFeedApp')
  .directive('messageInput', function () {
    return {
      transclude: true,
      scope: {
        submitFunction: '&',
        submitButtonText: '@',
        message: '=messageData',
        image: '='
      },
      controller: function($scope, $element, topicService) {
        var vm = this;
        vm.activeTopics;

        topicService.getActiveTopics().then(function(topics) {
          vm.activeTopics = topics;
        });
      },
      controllerAs: 'messageInput',
      templateUrl: 'app/messageInput/messageInput.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      }
    };
  });
