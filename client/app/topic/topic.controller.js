'use strict';

angular.module('instantFeedApp')
  .controller('TopicController', function ($scope, topicService, socket, $injector, $modal) {
    var vm = this;
    var addTopicModal;
    vm.topics = [];

    topicService.getTopics().then(function(topics) {
      vm.topics = topics;
      socket.syncUpdates('topic', vm.topics);
    });

    vm.saveTopic = function(topic) {
      topic.name = topic.newName;
      topicService.update(topic);
      topic.edit = undefined;
    };

    vm.startEdit = function(topic) {
      topic.newName = topic.name;
      topic.edit = true;
    };

    vm.cancelEdit = function(topic) {
        topic.edit = undefined;
    };

    vm.update = function(topic) {
      topicService.update(topic);
    };

    vm.openAddTopic = function() {
      addTopicModal = $modal.open({animation: true,
        templateUrl: 'app/topic/addTopicModal.html',
        controller: 'TopicController.modal as topicController',
        size: 'sm'
      });
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('topic');
    });
  });

  angular.module('instantFeedApp')
    .controller('TopicController.modal', function(topicService, $modalInstance) {
      var vm = this;

      vm.addTopic = function(topic) {
        topic.active = true;
        topicService.save(topic);
        topic = undefined;
        $modalInstance.close();
      };

      vm.cancel = function() {
        $modalInstance.close();
      };

    });
