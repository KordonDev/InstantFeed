'use strict';

angular.module('instantFeedApp')
  .controller('NavbarController', function ($location, Auth) {
    var vm = this;
    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    vm.isActive = function(route) {
      return route === $location.path();
    };
  });
