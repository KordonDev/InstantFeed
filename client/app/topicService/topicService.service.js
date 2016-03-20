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

    /*
    * Loads all topics.
    */
    function getTopics() {
      return topicResource.query().$promise;
    }

    /*
    * Loads all active topics.
    */
    function getActiveTopics() {
      return topicResource.query({active: 'active'}).$promise;
    }

    /*
    * Saves a topic.
    */
    function save(topic) {
      return topicResource.save(topic).$promise;
    }

    /*
    * Loads a topic by id.
    */
    function get(id) {
      return topicResource.get({id: id}).$promise;
    }

    /*
    * Updates a topic.
    */
    function update(topic) {
      return topicResource.update(topic).$promise;
    }

    /*
    * Loads a active topic by id.
    */
    function topicExistsAndIsAcitve(topicId) {
      return topicResource.get({active:'active', id: topicId}).$promise;
    }

    return topicService;
  });
