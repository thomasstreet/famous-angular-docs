angular.module('famous-angular')

.factory('stateTransitions', function($rootScope, $state) {
  // Need to give dead time between animations, so that the compilation
  // of a new view will not stutter frame rate
  var DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS = 0;

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
    if (!comingFromLowerIndex()) {
      return $state.current.data.leaveAnimationDuration;
    }

    return $state.current.data.enterAnimationDuration;
  }


  function leaveDuration() {
    return $state.current.data.leaveAnimationDuration;
  }


  function getEnterInitialT() {
    return comingFromLowerIndex() ? 0 : 2;
  }


  function getLeaveT() {
    return comingFromLowerIndex() ? 2 : 0;
  }


  function comingFromLowerIndex() {
    if (!prevState) {
      return true;
    }

    var currentIndex = $state.current.data.index;
    var prevIndex = prevState.data.index;
  
    return prevIndex < currentIndex;
  }


  return {
    enter: function(t, $done) {
      var initialT = getEnterInitialT();
      t.set(initialT, { duration: 0 });

      t.delay(enterDelay() + DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS);

      // Always set to 1, regardless of transition direction
      t.set(1, { duration: enterDuration() }, $done);
    },
    leave: function(t, $done) {
      t.halt();

      t.delay(DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS);

      var leaveT = getLeaveT();
      console.log('start leave');
      t.set(leaveT, { duration: leaveDuration() }, $done);
    }
  }
});
