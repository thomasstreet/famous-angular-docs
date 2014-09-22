angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/state-intro.html',
      controller: 'stateIntroCtrl',
      data: {
        leaveAnimationDuration: 400,
        cssClass: 'state-intro'
      }
    })
    .state('1', {
      url: '/1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-1'
      }
    })
    .state('2', {
      url: '/2',
      templateUrl: 'templates/state-2.html',
      controller: 'state2Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-2'
      }
    })
    .state('3', {
      url: '/3',
      templateUrl: 'templates/state-3.html',
      controller: 'state3Ctrl',
      data: {
        leaveAnimationDuration: 1200,
        cssClass: 'state-3'
      }
    })
    .state('4', {
      url: '/4',
      templateUrl: 'templates/state-4.html',
      controller: 'state4Ctrl',
      data: {
        leaveAnimationDuration: 600,
        cssClass: 'state-4'
      }
    })
    .state('5', {
      url: '/5',
      templateUrl: 'templates/state-5.html',
      controller: 'state5Ctrl',
      data: {
        leaveAnimationDuration: 1200,
        cssClass: 'state-5'
      }
    });

    $urlRouterProvider.otherwise('intro');
})


;
