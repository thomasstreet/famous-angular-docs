angular.module('famous-angular', [
  'famous.angular',
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('intro', {
      url: '',
      templateUrl: 'templates/state-1.html'
    })
})

;
