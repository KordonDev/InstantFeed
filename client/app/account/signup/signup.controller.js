'use strict';

angular.module('instantFeedApp')
  .controller('SignUpController', function (Auth, $location) {
    var vm = this;
    vm.user = {};
    vm.errors = {};

    vm.register = function(form) {
      vm.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: vm.user.name,
          email: vm.user.email,
          password: vm.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          vm.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            vm.errors[field] = error.message;
          });
        });
      }
    };

  });
