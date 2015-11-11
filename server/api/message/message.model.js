'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  headline: String,
  text: String,
  picture: String,
  timePublished: Date,
  belongsTo: String
});

module.exports = mongoose.model('Message', MessageSchema);
