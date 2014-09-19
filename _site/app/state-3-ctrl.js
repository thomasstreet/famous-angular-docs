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
        [0.2, [0, 320, 0]]
      ])(t.get());
    }
  };

  $scope.data = {
    repeatCount: 1
  };

  $scope.cats = [{}];

  $scope.$watch('data.repeatCount', function(newVal, oldVal) {
    if (newVal) {
      $scope.cats = [];
      for (var i = 0; i < Number(newVal); i++) {
        $scope.cats.push({});
      }
    }
  });

  $scope.catTile = {
    translate: function($index) {
      return $timeline([
        [0.2, [0, 1000, 0], Easing.inOutQuart],
        [0.3, [$index >= 4 ? 205 : 0, ($index % 4) * 80, 0]]
      ])(t.get());
    }
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
