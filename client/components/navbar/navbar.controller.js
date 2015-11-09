'use strict';

angular.module('instantFeedApp')
  .controller('NavbarController', function ($location, Auth, loginModal) {
    var vm = this;
    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.isPublisher = Auth.isPublisher;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    vm.openLoginModal = function() {
      loginModal.open();
    };

    vm.isActive = function(route) {
      return route === $location.path();
    };
  });
