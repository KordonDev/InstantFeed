'use strict';

angular.module('instantFeedApp')
  .factory('loginModal', function loginModal($injector, $timeout, $window) {
    return {
      open: open
    };

    function open() {
      var $modal = $injector.get('$modal');
      $modal.open({animation: true,
        templateUrl: 'components/login/loginModal.html',
        controller: 'LoginController as login',
        size: 'sm'
      });
    }

  });
