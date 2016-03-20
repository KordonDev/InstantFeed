'use strict';

angular.module('instantFeedApp')
  .directive('messageInput', function (Lightbox) {
    return {
      transclude: true,
      scope: {
        submitFunction: '&',
        submitButtonText: '@',
        message: '=messageData',
        image: '='
      },
      bindToController: true,
      controller: function($scope, $element, Topic) {
        var vm = this;
        vm.activeTopics = [];
        vm.messageCopy = angular.copy(vm.message);

        /*
        * If message is valid, the submitFunction is called and the form cleaned.
        */
        vm.submitForm = function() {
          if ($scope.messageForm.$valid) {
            vm.submitFunction({message: vm.messageCopy, image: vm.image})
              .then(function(response) {
                vm.messageCopy = null;
                vm.image = null;
                $scope.messageForm.$setPristine();
                $scope.messageForm.$setUntouched();
              });
          }
        };

        /*
        * Loads active Topics.
        */
        Topic.getActiveTopics().then(function(topics) {
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
