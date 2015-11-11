'use strict';

var express = require('express');
var controller = require('./topic.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/active', controller.indexActive);
router.get('/:id', controller.show);
router.get('/active/:id', controller.isActive);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
