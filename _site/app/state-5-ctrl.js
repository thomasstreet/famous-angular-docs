angular.module('famous-angular')

.controller('state5Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.webframe = {
    translate: $timeline([
      [0, [0, 1000, 0], Easing.inOutQuart],
      [0.2, [250, 180, 0]]
    ]),
    banner: {
      translate:$timeline([
        [0, [0, 1000, 0], Easing.inOutQuart],
        [0.2, [84, 110, 0]]
      ])
    }
  };

  $scope.content = {
    translate: $timeline([
      [0, [1000, 0, 0], Easing.inOutQuart],
      [0.2, [1170, 170, 0]]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.3, [0, 1000, 0], Easing.inOutQuart],
      [0.5, [0, 150, 0]]
    ])
  };

});
