angular.module('famous-angular')

.factory('stateTransitions', function($rootScope, $state) {
  var prevState;

  $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    prevState = fromState;
  });


  function enterDelay() {
    if (!prevState) {
      return 0;
    }
    return prevState.data.leaveAnimationDuration;
  }

  function enterDuration() {
    return $state.current.data.enterAnimationDuration;
  }


  function leaveDuration() {
    return $state.current.data.leaveAnimationDuration;
  }


  function getEnterInitialT() {
    if (!prevState) {
      return 0;
    }

    var currentIndex = $state.current.data.index;
    var prevIndex = prevState.data.index;

    return currentIndex > prevIndex ? 0 : 2;
  }


  function getLeaveT() {
    var currentIndex = $state.current.data.index;
    var prevIndex = prevState.data.index;

    return currentIndex > prevIndex ? 2 : 0;
  }


  return {
    enter: function(t, $done) {
      var initialT = getEnterInitialT();
      t.set(initialT, { duration: 0 });

      t.delay(enterDelay());

      // Always set to 1, regardless of transition direction
      t.set(1, { duration: enterDuration() }, $done);
    },
    leave: function(t, $done) {
      t.halt();

      var leaveT = getLeaveT();
      t.set(leaveT, { duration: leaveDuration() }, $done);
    }
  }
});
