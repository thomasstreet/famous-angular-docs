angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: 'intro',
      templateUrl: 'templates/state-intro.html',
      controller: 'stateIntroCtrl',
      data: {
        leaveAnimationDuration: 400
      }
    })
    .state('1', {
      url: '1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl',
      data: {
        leaveAnimationDuration: 600
      }
    })
    .state('2', {
      url: '2',
      templateUrl: 'templates/state-2.html',
      controller: 'state2Ctrl',
      data: {
        leaveAnimationDuration: 600
      }
    });
})


;
