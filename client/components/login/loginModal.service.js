'use strict';

angular.module('instantFeedApp')
  .factory('loginModal', function loginModal($injector, $timeout, $window) {
    return {
      open: open
    };

    function open() {
      var $modal = $injector.get('$modal');
      var loginModal = $modal.open({animation: true,
        templateUrl: 'components/login/loginModal.html',
        controller: 'LoginController as login',
        size: 'sm'
      });

      loginModal.opened.then(function() {
        $timeout(function() {
          var element = $window.document.getElementById('email');
          if (element) {
            element.focus();
          }
        });
      })
    }

  });
