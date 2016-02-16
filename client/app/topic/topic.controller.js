'use strict';

angular.module('instantFeedApp')
  .controller('TopicController', function ($scope, Topic, socket, $injector, $modal) {
    var vm = this;
    var addTopicModal;
    vm.topics = [];

    Topic.getTopics().then(function(topics) {
      vm.topics = topics;
      socket.syncUpdates('topic', vm.topics);
    });

    vm.saveTopic = function(topic) {
      topic.name = topic.newName;
      Topic.update(topic);
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
      Topic.update(topic);
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
    .controller('TopicController.modal', function(Topic, $modalInstance) {
      var vm = this;
      vm.topic = {};

      function cleanTopic() {
        vm.topic = {};
        vm.topic.color = 'rgba(240,103,103, 0.4)';
      }
      cleanTopic();

      vm.addTopic = function(topic) {
        topic.active = true;
        Topic.save(topic);
        cleanTopic();
        $modalInstance.close();
      };

      vm.cancel = function() {
        $modalInstance.close();
      };

    });
