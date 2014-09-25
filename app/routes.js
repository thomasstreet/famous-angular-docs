angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/state-intro.html',
      controller: 'stateIntroCtrl',
      data: {
        index: 0,
        enterAnimationDuration: 3000,
        leaveAnimationDuration: 600,
        cssClass: 'state-intro'
      }
    })
    .state('1', {
      url: '/1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl',
      data: {
        index: 1,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 600,
        cssClass: 'state-1'
      }
    })
    .state('2', {
      url: '/2',
      templateUrl: 'templates/state-2.html',
      controller: 'state2Ctrl',
      data: {
        index: 2,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 600,
        cssClass: 'state-2'
      }
    })
    .state('3', {
      url: '/3',
      templateUrl: 'templates/state-3.html',
      controller: 'state3Ctrl',
      data: {
        index: 3,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 1200,
        cssClass: 'state-3'
      }
    })
    .state('4', {
      url: '/4',
      templateUrl: 'templates/state-4.html',
      controller: 'state4Ctrl',
      data: {
        index: 4,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 600,
        cssClass: 'state-4'
      }
    })
    .state('5', {
      url: '/5',
      templateUrl: 'templates/state-5.html',
      controller: 'state5Ctrl',
      data: {
        index: 5,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 1200,
        cssClass: 'state-5'
      }
    })
    .state('end', {
      url: '/end',
      templateUrl: 'templates/state-end.html',
      controller: 'stateEndCtrl',
      data: {
        index: 6,
        enterAnimationDuration: 4000,
        leaveAnimationDuration: 1200,
        cssClass: 'state-end'
      }
    });

    $urlRouterProvider.otherwise('intro');
})


;
