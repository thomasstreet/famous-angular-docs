angular.module('famous-angular')

.factory('scrollEvents', function($rootScope, $state, stateTransitions) {
  // Amount to time to disable scroll events AFTER the state's entrance
  // animation has started
  var DISABLE_EVENTS_DURATION = 400;

  // WE MUST DISABLE SCROLL EVENTS AFTER STATE CHANGE

  // 1) There may be left over scroll inertia that would trigger scroll
  // gravity immediately after switching to a new states, resulting in
  // bouncy gravity effect duration the new state's entrance animation

  // 2) Changing $state manipulates the scroll bar position, and doing so
  // would fire all scroll handlers.  One of the scroll handler changes
  // ui.router's $state.  If we don't disable this handler, two $state.go()'s
  // will be triggered immediately, ruining our location history

  var disableTimeout;
  var _scrollEventsDisabled = false;

  $rootScope.$on('$stateChangeSuccess', function() {
    if (disableTimeout) {
      clearTimeout(disableTimeout);
    }

    _scrollEventsDisabled = true;

    var totalDisableDuration = stateTransitions.enterDelay() + DISABLE_EVENTS_DURATION;

    disableTimeout = setTimeout(function() {
      _scrollEventsDisabled = false;
    }, totalDisableDuration);
  });

  var _listeners = {
    scrollstart: [],
    scroll: [],
    scrollend: []
  };

  $(window).bind('scrollstart', function() {
    angular.forEach(_listeners.scrollstart, function(handlerFn) {
      handlerFn();
    })
  });

  $(window).bind('scroll', function() {
    if (_scrollEventsDisabled) return;

    angular.forEach(_listeners.scroll, function(handlerFn) {
      handlerFn();
    })
  });

  $(window).bind('scrollend', function() {
    angular.forEach(_listeners.scrollend, function(handlerFn) {
      handlerFn();
    })
  });

  return {
    disabled: function() {
      return !!_scrollEventsDisabled;
    },
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
    }
  };
});
