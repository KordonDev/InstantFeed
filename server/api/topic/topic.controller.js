'use strict';

var _ = require('lodash');
var Topic = require('./topic.model');

// Get list of topics
exports.index = function(req, res) {
  Topic.find(function (err, topics) {
    if(err) { return handleError(res, err); }
    return res.json(200, topics);
  });
};

// Get list of active topics
exports.indexActive = function(req, res) {
  Topic.find({'active': true}, function(err, topics) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, topics)
  });
};

// Get a single topic
exports.show = function(req, res) {
  Topic.findById(req.params.id, function (err, topic) {
    if(err) { return handleError(res, err); }
    if(!topic) { return res.send(404); }
    return res.json(topic);
  });
};

// Get if a topic is active
exports.isActive = function(req, res) {
  Topic.findById(req.params.id, function (err, topic) {
    if(err) { return handleError(res, err); }
    if(!topic) { return res.send(404); }
    if (topic.active) {
      return res.json(topic);
    }
    return res.send(420);
  });
};

// Creates a new topic in the DB.
exports.create = function(req, res) {
  Topic.create(req.body, function(err, topic) {
    if(err) { return handleError(res, err); }
    return res.json(201, topic);
  });
};

// Updates an existing topic in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Topic.findById(req.params.id, function (err, topic) {
    if (err) { return handleError(res, err); }
    if(!topic) { return res.send(404); }
    var updated = _.merge(topic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, topic);
    });
  });
};

// Deletes a topic from the DB.
/*
exports.destroy = function(req, res) {
  Topic.findById(req.params.id, function (err, topic) {
    if(err) { return handleError(res, err); }
    if(!topic) { return res.send(404); }
    topic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
*/
function handleError(res, err) {
  return res.send(500, err);
}
