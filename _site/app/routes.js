angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: 'intro',
      templateUrl: 'templates/state-intro.html',
      controller: 'stateIntroCtrl'
    })
    .state('1', {
      url: '1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl'
    });
})

;
