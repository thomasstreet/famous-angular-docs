angular.module('famous-angular')

.controller('state5Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.heroBlockOpacity = new Transitionable(0);

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      $done();
      $scope.showHeroBlock = true;
      $scope.heroBlockOpacity.set(1, {duration: 500, curve: Easing.inCubic});
      $scope.$digest();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 75]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.webframe = {
    translate: $timeline([
      [0, [250, 180, -150], Easing.inOutQuart],
      [0.2, [250, 180, 0]]
    ]),
    banner: {
      translate:$timeline([
        [0, [84, 110, 2], Easing.inOutQuart],
        [0.2, [84, 110, 2]]
      ])
    }
  };

  $scope.content = {
    translate: $timeline([
      [0, [1170, 170, -150], Easing.inOutQuart],
      [0.2, [1170, 170, 0]]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.3, [0, 150, -150], Easing.inOutQuart],
      [0.5, [0, 150, 0]]
    ])
  };

});
