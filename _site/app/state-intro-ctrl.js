angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    $scope.$parent.navTimeline.set(0, {duration: 1000});
    stateTransitions.enter(t, $done);
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.opacity = function() {
    return $timeline([
      [0, 0, Easing.inOutQuart],
      [0.5, 1]
    ])(t.get());
  };

});
