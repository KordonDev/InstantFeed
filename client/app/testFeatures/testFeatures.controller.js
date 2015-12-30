'use strict';

angular.module('instantFeedApp')
  .controller('TestFeaturesController', function (webNotification, $window, $timeout, socket) {
    var vm = this;
    vm.testMessages = [];
    vm.connectionStatus = {
      'connected': false
    };
    socket.connected(vm.connectionStatus);
    socket.connected(vm.connectionStatus);

    socket.socket.on('chatMessage', function(message) {
      vm.testMessages.unshift(message);
    });

    vm.sendMessage = function() {
      socket.socket.emit('chatMessage', vm.message);
      vm.message = null;
    };

    vm.sendNotification = function(notification) {
      $timeout(function() {notify(notification);}, notification.delay * 1000);
    };

    function notify(notification) {
      webNotification.showNotification(notification.title, {
        body: notification.text,
        icon: 'favicon.ico',
        onClick: function onNotificationClicked() {
          $window.focus();
        },
        autoClose: notification.displayTime * 1000
      }, function onShow(error) {
        if (error) {
          alert('Unable to show notification: ' + error.message);
        }
      });
    }

  });
