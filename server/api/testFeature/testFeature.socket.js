/**
 * Broadcast updates to client when the model changes
 */

'use strict';

exports.register = function(socket) {
  socket.on('chatMessage', function(message) {
    socket.emit('chatMessage', message);
  })
};
