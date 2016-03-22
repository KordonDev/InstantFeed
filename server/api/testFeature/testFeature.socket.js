/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var register = function(socket, testFeatureSockets) {
  testFeatureSockets.push(socket);
  socket.on('chatMessage', function(message) {
    emitAll(message, testFeatureSockets);
  });
};

function emitAll(message, testFeatureSockets) {
  for (var i = 0; i < testFeatureSockets.length; i++) {
    testFeatureSockets[i].emit('chatMessage', message);
  }
}

var unregister = function(socket, testFeatureSockets) {
  var index = testFeatureSockets.indexOf(socket);
  if (index > -1) {
    testFeatureSockets.splice(index, 1);
  }
};

module.exports = {
  register: register,
  unregister: unregister
};
