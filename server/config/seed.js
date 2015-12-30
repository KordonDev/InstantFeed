/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Message = require('../api/message/message.model');
var Topic = require('../api/topic/topic.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'publisher',
    name: 'Bob',
    email: 'publisher@admin.com',
    password: 'publisher'
  }, function() {
    console.log('finished populating users');
  });
});

Message.find({}).remove(function() {
  console.log('Messages removed');
});

Topic.find({}).remove(function() {
  Topic.create({
    name: 'Football',
    color: 'rgba(26,190,25,0.4)',
    active: true
  }, {
    name: 'Handball',
    color: 'rgba(240,103,103, 0.4)',
    active: false
  });
});
