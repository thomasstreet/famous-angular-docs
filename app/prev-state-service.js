angular.module('famous-angular')

.factory('prevState', function($rootScope) {
  var prevState;

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    prevState = fromState;
  });

  return {
    leaveAnimationDuration: function() {
      if (!prevState || !prevState.data) {
        return 0;
      }
      return prevState.data.leaveAnimationDuration;
    }
  }
});
