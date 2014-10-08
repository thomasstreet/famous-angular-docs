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

  var _scrollEventsDisabled = false;

  $rootScope.$on('$stateChangeSuccess', function() {
    _scrollEventsDisabled = true;

    var totalDisableDuration = stateTransitions.enterDelay() + DISABLE_EVENTS_DURATION;

    setTimeout(function() {
      _scrollEventsDisabled = false;
    }, totalDisableDuration);
  });

  return {
    disabled: function() {
      return !!_scrollEventsDisabled;
    }
  };
});
