'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var Topic = require('../topic/topic.model');

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get list of messages for array of topics, sorted and limited
// req.query.topics has to be a structure like topics=["1","2"] and skip=1
exports.messagesForTopic = function(req, res) {
  var topics = [];
  topics = JSON.parse(req.query.topics);
  console.log(topics);
  var skip = (req.query.topics ? req.query.topics : 0);
  var messages = Message.find({"belongsTo": {$in: topics}})
    .sort({timePublished: -1}).skip(skip).limit(20).exec(function(err, messages) {
      if (err) { return handleError(res, err); }
      console.log(messages);
      return res.json(200, messages);
    });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    return res.json(201, message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
