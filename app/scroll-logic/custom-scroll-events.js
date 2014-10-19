angular.module('famous-angular')

.factory('$scroll', function($rootScope) {
  /* Custom events to listen for:

    $rootScope.$on('fa-scrollend', function() {
      console.log('scrollend!');
    });

    $rootScope.$on('fa-scrollstart', function() {
      console.log('scrollstart!');
    });

    $rootScope.$on('fa-scroll', function() {
      console.log('scroll!');
    });

 */

  var $scrolledElement = $('#scroll-container');
  var DELAY_UNTIL_SCROLLEND = 300;

  var scrollendTimeout;

  $scrolledElement.bind('scroll', function() {

    // If a scrollendTimeout exists, this scroll event is in the middle 
    // of a scroll session 
    if (scrollendTimeout) {
      clearTimeout(scrollendTimeout);
      scrollendTimeout = null;

    // If there isn't a pending scrollend timeout, this is a fresh scroll session
    } else {
      $rootScope.$emit('fa-scrollstart');
    }

    $rootScope.$emit('fa-scroll');

    scrollendTimeout = setTimeout(function() {
      $rootScope.$emit('fa-scrollend');
      scrollendTimeout = null;
    }, DELAY_UNTIL_SCROLLEND)

  });

  return {
    setPosition: function(newScrollPosition) {
      return $scrolledElement.scrollTop(newScrollPosition);
    },
    getPosition: function() {
      return $scrolledElement.scrollTop();
    }
  };

});
