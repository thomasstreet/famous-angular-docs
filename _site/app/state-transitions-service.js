angular.module('famous-angular')

.factory('stateTransitions', function($rootScope, $state) {
  var prevState;

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    prevState = fromState;
  });

  return function() {
    return {
      enterDelay: function() {
        if (!prevState || !prevState.data) {
          return 0;
        }
        return prevState.data.leaveAnimationDuration;
      },
      leaveDuration: function() {
        return $state.current.data.leaveAnimationDuration;
      }
    }
  }
});
