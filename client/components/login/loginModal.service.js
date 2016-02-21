'use strict';

angular.module('instantFeedApp')
  .factory('loginModal', function loginModal($injector, $timeout, $window) {
    return {
      open: open,
      isOpen: isOpen
    };

    /*
    * Opens the login modal.
    */
    function open() {
      var $modal = $injector.get('$modal');
      $modal.open({animation: true,
        templateUrl: 'components/login/loginModal.html',
        controller: 'LoginController as login',
        size: 'sm'
      });
    }
    /*
    * Checks if the loginModal is opend.
    * http://stackoverflow.com/questions/20519021/reliably-determine-if-angular-ui-modal-is-open-or-closed-shown-or-hidden
    */
    function isOpen() {
      var $modalStack = $injector.get('$modalStack');
      return !! $modalStack.getTop();
    }

  });
