angular.module('famous-angular')

.run(function($rootScope) {

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    // Make sure that fa-app contains the class for both the previous state
    // and current state, to ensure the correct CSS namespacing when
    // transitioning between views with fa-animate-enter/leave
    var classes = [
      toState.data.cssClass,
      (fromState && fromState.data) ? fromState.data.cssClass : ''
    ].join(' ');

    $rootScope.stateClasses = classes;
  });

});
