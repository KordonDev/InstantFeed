'use strict';

angular.module('instantFeedApp')
  .controller('MainController', function ($scope, $http, socket) {
    var vm = this;
    vm.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      vm.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', vm.awesomeThings);
    });

    vm.addThing = function() {
      if(vm.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: vm.newThing });
      vm.newThing = '';
    };

    vm.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
