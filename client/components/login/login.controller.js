'use strict';

angular.module('instantFeedApp')
  .controller('LoginController', function (Auth, $modalInstance) {
    var vm = this;
    vm.user = {};
    vm.errors = {};

    vm.login = function(form) {
      vm.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
        .then( function() {
          // Logged in, close modal
          $modalInstance.close();
        })
        .catch( function(err) {
          vm.errors.other = err.message;
        });
      }
    };

  });
