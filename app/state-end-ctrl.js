angular.module('famous-angular')

.controller('stateEndCtrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, scrollGravity) {

  var Transitionable = $famous['famous/transitions/Transitionable'];

  $scope.gravity = scrollGravity.timelines;

  $scope.grav = new Transitionable(50);

  scrollGravity.setState({
    grav: $scope.grav,
    startPosition: 0
  });


});
