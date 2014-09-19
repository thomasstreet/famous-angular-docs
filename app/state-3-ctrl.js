angular.module('famous-angular')

.controller('state3Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.inputRange = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 300, 0]]
      ])(t.get());
    }
  };

  $scope.data = {
    repeatCount: 1
  };

  $scope.code = {
    translate: function() {
      return $timeline([
        [0.2, [0, 1000, 0], Easing.inOutQuart],
        [0.3, [0, 100, 0]]
      ])(t.get());
    }
  };

});
