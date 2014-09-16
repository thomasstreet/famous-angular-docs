angular.module('famous-angular', [
  'famous.angular',
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('intro', {
      url: '',
      templateUrl: 'templates/state-intro.html',
      controller: 'state1Ctrl'
    })
    .state('1', {
      url: '1',
      templateUrl: 'templates/state-1.html',
      controller: 'state1Ctrl'
    })
})

;
