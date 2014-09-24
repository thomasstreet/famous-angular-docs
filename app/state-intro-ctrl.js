angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, $done);
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

/*--------------------------------------------------------------*/

  $scope.opacity = $timeline([
    [0, 0, Easing.inOutQuart],
    [0.5, 1],
    [1, 1, Easing.inOutQuart],
    [2, 0]
  ]);

/*--------------------------------------------------------------*/

  $scope.logo = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 120, 0]],
      [1.6, [0, 120, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

});
