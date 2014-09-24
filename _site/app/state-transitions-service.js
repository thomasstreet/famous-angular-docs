angular.module('famous-angular')

.factory('stateTransitions', function($rootScope, $state) {
  var prevState;

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    prevState = fromState;
  });

  function enterDelay() {
    if (!prevState || !prevState.data) {
      return 0;
    }
    return prevState.data.leaveAnimationDuration;
  }

  function leaveDuration() {
    return $state.current.data.leaveAnimationDuration;
  }

  function getEnterInitialT() {
    return 0;
  }

  function getEnterEndT() {
    return 1;
  }

  function getLeaveT() {
    return 2;
  }

  return {
    enter: function(t, $done) {
      var initialT = getEnterInitialT();
      t.set(initialT, { duration: 0 });

      t.delay(enterDelay());

      var endT = getEnterEndT();
      var enterDuration = 3000;
      t.set(endT, { duration: enterDuration }, $done);
    },
    leave: function(t, $done) {
      t.halt();

      var leaveT = getLeaveT();
      t.set(leaveT, { duration: leaveDuration() }, $done);
    }
  }
});
