'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  picture: String,
  timePublished: Date,
  belongsTo: String
});

module.exports = mongoose.model('Message', MessageSchema);
