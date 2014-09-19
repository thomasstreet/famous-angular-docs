angular.module('famous-angular')

.controller('state5Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.webframe = {
    translate: function() {
      return $timeline([
        [0, [0, 1000, 0], Easing.inOutQuart],
        [0.2, [0, 30, 0]]
      ])(t.get());
    },
    banner: {
      translate: function() {
        return $timeline([
          [0, [0, 1000, 0], Easing.inOutQuart],
          [0.2, [53, 88, 0]]
        ])(t.get());
      }
    }
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    translate: function() {
      return $timeline([
        [0.3, [0, 1000, 0], Easing.inOutQuart],
        [0.5, [0, 120, 0]]
      ])(t.get());
    }
  };


});
