'use strict';

var express = require('express');
var controller = require('./topic.controller');
var auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/active', controller.indexActive);
router.get('/:id', controller.show);
router.get('/active/:id', controller.isActive);
router.post('/', auth.hasRole('publisher'), controller.create);
router.put('/:id', auth.hasRole('publisher'), controller.update);
router.patch('/:id', auth.hasRole('publisher'), controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
