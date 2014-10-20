angular.module('famous-angular')

.factory('$scroll', function($rootScope) {

  $(window).on('mousewheel', function(event) {
      //console.log(event.deltaX, event.deltaY);
  });

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

  var $scrollContainer = $('#scroll-container');
  var DELAY_UNTIL_SCROLLEND = 300;

  var scrollendTimeout;

  $scrollContainer.bind('scroll', function() {
    // If there isn't a pending scrollend timeout, this is a fresh scroll session
    if (!scrollendTimeout) $rootScope.$emit('fa-scrollstart');

    // If a scrollendTimeout exists, this scroll event is in the middle 
    // of a scroll session 
    if (scrollendTimeout) {
      clearTimeout(scrollendTimeout);
      scrollendTimeout = null;
    }

    $rootScope.$emit('fa-scroll');

    scrollendTimeout = setTimeout(function() {
      $rootScope.$emit('fa-scrollend');
      scrollendTimeout = null;
    }, DELAY_UNTIL_SCROLLEND)

  });


  return {
    setPosition: function(newScrollPosition) {
      return $scrollContainer.scrollTop(newScrollPosition);
    },
    getPosition: function() {
      return $scrollContainer.scrollTop();
    },
    getHeight: function() {
      return $scrollContainer.height();
    },
    // Set the height for the element forcing the overflow
    setHeight: function(newScrollHeight) {
      return $('#force-overflow').height(newScrollHeight);
    }
  };

});
