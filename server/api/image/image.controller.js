'use strict';

var _ = require('lodash');
var fs = require('fs');
var multiparty = require('multiparty');
var config = require('../../config/environment');
var path = require('path');
var uuid = require('uuid');
var basePath = config.root + '/public/';
//var Image = require('./image.model');

// Get a single image
exports.show = function(req, res) {
  var file = req.params.id;
  var img = fs.readFileSync(__dirname + "/upload/images/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(img, 'binary');
  /*Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.json(image);
  });*/
};

// Creates a new image in public/upload.
exports.create = function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (files.file === undefined || files.file.length === 0) {
      return res.send(400);
    }
    fs.readFile(files.file[0].path, function(error, data) {
      if (error) {
        return handleError(res, error);
      }
      var imagePath = getFilePath(files.file[0].originalFilename);
      fs.writeFile(basePath + imagePath, data, function(err) {
        if (err) {
          return handleError(res, error);
        }
        return res.json(201, imagePath);
      });
    })
  });
};

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function getFilePath(filename) {
  var fileExtension = filename.split('.').pop();
  return 'uploads/images/' + uuid.v4() + '.' + fileExtension;
}
