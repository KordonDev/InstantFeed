'use strict';

angular.module('instantFeedApp')
  .factory('Topic', function ($resource) {
    var topicService = {
      getTopics: getTopics,
      getActiveTopics: getActiveTopics,
      save: save,
      topicExistsAndIsAcitve: topicExistsAndIsAcitve,
      get: get,
      update: update
    };

    var topicResource = $resource('/api/topics/:active/:id', {id: '@_id'}, {update: {method: 'PUT'}});
    var topics;

    function getTopics() {
      return topicResource.query().$promise;
    }

    function getActiveTopics() {
      return topicResource.query({active: 'active'}).$promise;
    }

    function save(topic) {
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

    return topicService;
  });
