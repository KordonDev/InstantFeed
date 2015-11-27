'use strict';

angular.module('instantFeedApp')
  .factory('topicService', function ($resource) {
    var topicService = {
      getTopics: getTopics,
      getActiveTopics: getActiveTopics,
      createTopic: createTopic,
      topicExistsAndIsAcitve: topicExistsAndIsAcitve,
      get: get,
      topicNameInSocket: topicNameInSocket,
      update: update
    };

    var topicResource = $resource('/api/topics/:active/:id', {id: '@_id'}, {update: {method: 'PUT'}});

    function getTopics() {
      return topicResource.query().$promise;
    }

    function getActiveTopics() {
      return topicResource.query({active: 'active'}).$promise;
    }

    function createTopic(topic) {
      return topicResource.save(topic).$promise;
    }

    function get(id) {
      return topicResource.get({id: id}).$promise;
    }

    function update(topic) {
      return topicResource.update(topic).$promise;
    }

    function topicExistsAndIsAcitve(topicId) {
      return topicResource.get({active:'active', id: topicId}).$promise;
    }

    function topicNameInSocket(event, message, array) {
      if (event === 'created' || event === 'updated') {
        topicService.get(message.belongsTo).then(function(topic) {
          message.belongsToName = topic.name;
        });
      }
    }

    return topicService;
  });
