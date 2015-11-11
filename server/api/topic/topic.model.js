'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: String,
  active: Boolean
});

module.exports = mongoose.model('Topic', TopicSchema);
