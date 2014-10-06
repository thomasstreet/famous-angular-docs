angular.module('famous-angular')

.run(function($rootScope) {

  $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    $rootScope.pageTitle = toState.data.pageTitle + ' - Famo.us/Angular';
  });

});
