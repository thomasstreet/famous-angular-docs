angular.module('famous-angular')

.factory('scrollEvents', function($rootScope, $state, stateTransitions) {

  // WE MUST DISABLE SCROLL HANDLERS AFTER STATE CHANGE

  // 1) There may be left over scroll inertia that would trigger scroll
  // gravity immediately after switching to a new state, resulting in
  // bouncy gravity effect duration the new state's entrance animation.

  // 2) Changing $state manipulates the scroll bar position, and doing so
  // would fire all scroll handlers.  One of the scroll handler changes
  // ui.router's $state.  If we don't disable this handler, two $state.go()'s
  // will be triggered immediately, ruining our location history.

  // After state change, disable ALL scroll events for a given amount of time.
  // This is because changing state will trigger a window.scrollTo(), which
  // will trigger a scrollstart, which will allow for scroll handlers to fire,
  // which will force an incorrect state change, resulting in back-to-back
  // state changes and a broken location history.
  // TODO: FIND A BETTER SOLUTION
  var disableScrollUntilScrollstart;
  var disableScrollEvents;
  var timeout;

  $rootScope.$on('$stateChangeSuccess', function() {
    //disableScrollUntilScrollstart = true;
    disableScrollEvents = true;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function() {
      disableScrollEvents = false;
    }, 1000);

  });

  var _listeners = {
    scrollstart: [],
    scroll: [],
    scrollend: []
  };

  $(window).bind('scrollstart', function() {
    if (disableScrollEvents) return;

    if (disableScrollUntilScrollstart) {
      disableScrollUntilScrollstart = false;
    }

    angular.forEach(_listeners.scrollstart, function(handlerFn) {
      handlerFn();
    })
  });

  $(window).bind('touchmove', scrollHandler);
  $('#scroll-container').bind('scroll', scrollHandler);

  function scrollHandler() {
    console.log('body scroll');
    if (disableScrollEvents) return;

    if (disableScrollUntilScrollstart) return;

    angular.forEach(_listeners.scroll, function(handlerFn) {
      handlerFn();
    })
  }

  $(window).bind('scrollend', function() {
    if (disableScrollEvents) return;

    angular.forEach(_listeners.scrollend, function(handlerFn) {
      handlerFn();
    })
  });

  return {
    addListeners: {
      scrollstart: function(handlerFn) {
        _listeners.scrollstart.push(handlerFn);
      },
      scroll: function(handlerFn) {
        _listeners.scroll.push(handlerFn);
      },
      scrollend: function(handlerFn) {
        _listeners.scrollend.push(handlerFn);
      }
    },
    setScrollPosition: function(newScrollPosition) {
      window.scrollTo(0, newScrollPosition);
    }
  };
});
