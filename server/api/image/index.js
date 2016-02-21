'use strict';

var express = require('express');
var controller = require('./image.controller');
var auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', auth.hasRole('publisher'), controller.create);
router.put('/:id', auth.hasRole('publisher'), controller.update);
router.patch('/:id', auth.hasRole('publisher'), controller.update);
router.delete('/', auth.hasRole('publisher'), controller.destroy);

module.exports = router;
