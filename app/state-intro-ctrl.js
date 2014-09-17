angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, $state, prevState) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    t.delay(prevState.leaveAnimationDuration());
    t.set(1, {duration: 600}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: $state.current.data.leaveDuration}, $done);
  };

  $scope.opacity = function() {
    return $timeline([
      [0, 0, Easing.inOutQuart],
      [0.5, 1]
    ])(t.get());
  };

});
