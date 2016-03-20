'use strict';

angular.module('instantFeedApp')
  .controller('TopicController', function ($scope, Topic, socket, $injector, $modal) {
    var vm = this;
    var addTopicModal;
    vm.topics = [];

    /*
    * Loads all topics and syncs them over websockets.
    */
    Topic.getTopics().then(function(topics) {
      vm.topics = topics;
      socket.syncUpdates('topic', vm.topics);
    });

    /*
    * Saves an edited topic.
    */
    vm.saveTopic = function(topic) {
      topic.name = topic.newName;
      Topic.update(topic);
      topic.edit = undefined;
    };

    /*
    * Copies the old topic name and sets edit to true.
    */
    vm.startEdit = function(topic) {
      topic.newName = topic.name;
      topic.edit = true;
    };

    /*
    * Ends editing without saving.
    */
    vm.cancelEdit = function(topic) {
        topic.edit = undefined;
    };

    /*
    * Updates a topic.
    */
    vm.update = function(topic) {
      Topic.update(topic);
    };

    /*
    * Opens the modal to add a new topic.
    */
    vm.openAddTopic = function() {
      addTopicModal = $modal.open({animation: true,
        templateUrl: 'app/topic/addTopicModal.html',
        controller: 'TopicController.modal as topicController',
        size: 'sm'
      });
    };

    /*
    * When page is destroied, the websocket connection is closed.
    */
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('topic');
    });
  });

  angular.module('instantFeedApp')
    .controller('TopicController.modal', function(Topic, $modalInstance) {
      var vm = this;
      vm.topic = {};

      /*
      *  Resets the topic form model.
      */
      function cleanTopic() {
        vm.topic = {};
        vm.topic.color = 'rgba(240,103,103, 0.4)';
      }
      cleanTopic();

      /*
      * Adds a new Topic, cleans the model and closes the modal.
      */
      vm.addTopic = function(topic) {
        topic.active = true;
        Topic.save(topic);
        cleanTopic();
        $modalInstance.close();
      };

      /*
      * Closes the modal.
      */
      vm.cancel = function() {
        $modalInstance.close();
      };

    });
