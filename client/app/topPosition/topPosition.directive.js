'use strict';

angular.module('instantFeedApp')
  .directive('topPosition', function ($window, $document) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var window = angular.element($window);
        var scroll;
        var position = function() {
          var width = $document.find('.feed-container').width();
          scroll = window.scrollTop();
          if (scroll > 80) {
            element.css({
                position: 'fixed',
                'z-index': '100',
                'background-color': '#FFF',
                'margin-top': '0px',
                top: '0px',
                width: width
            });
          } else {
            element.css({
              position: 'relative',
              width: 'inherit'
            });
          }
        };
        window.on('scroll', scope.$apply.bind(scope, position));
        position();
      }
    };
  });
