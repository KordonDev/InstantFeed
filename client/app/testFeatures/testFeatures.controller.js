'use strict';

angular.module('instantFeedApp')
  .controller('TestFeaturesController', function (webNotification, $window, $timeout) {
    var vm = this;

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
