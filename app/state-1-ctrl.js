angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.content = {
    translate: $timeline([
      [0, [0, 0, 0], Easing.inOutQuart],
      [0.2, [220, 190, 0]],
    ])
  };

  $scope.heading = {
    translate: function(timeValue) {
      var z = $timeline([
        [0, -200, Easing.outQuad],
        [0.2, 0],
        [1.6, 0, Easing.outQuad],
        [2, 400]
      ])(timeValue);

      return [0, 0, z];
    },
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.frame = {
    visual: {
      translate: $timeline([
        [0.3, [0, -20, -100], Easing.outQuad],
        [0.5, [0, 0, 0]],
        [1.5, [0, 0, 0]],
        [2, [0, 0, 200]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 0],
        [0.5, 1],
        [1.5, 1],
        [2, 0]
      ])
    },
    code: {
      translate: $timeline([
        [0.3, [0, 2000, 0], Easing.inOutQuart],
        [0.5, [0, 100, 0]]
      ])
    }
  };

  $scope.header = {
    visual: {
      translate: $timeline([
        [0.4, [0, -2000, 0], Easing.inOutQuart],
        [0.6, [20, 65, 0]]
      ])
    },
    code: {
      translate: $timeline([
        [0.4, [0, 2000, 0], Easing.inOutQuart],
        [0.6, [0, 120, 0]]
      ])
    },
  };

  $scope.sidenav = {
    visual: {
      translate: $timeline([
        [0.5, [0, 2000, 0], function(x) { return x }],
        [0.7, [20, 135, 0]]
      ])
    },
    code: {
      translate: $timeline([
        [0.5, [0, -2000, 0], Easing.inOutQuart],
        [0.7, [0, 140, 0]]
      ])
    },
  };

  $scope.container = {
    code: {
      translate: $timeline([
        [0.6, [-2000, 0, 0], Easing.inOutQuart],
        [0.8, [0, 160, 0]]
      ])
    },
    visual: {
      translate: $timeline([
        [0.6, [2000, 90, 0], function(x) { return x }],
        [0.8, [110, 135, 0]]
      ])
    },
  };


  $scope.frameContent = {
    visual: {
      translate: function() {
        return [135, 160, 0];
      },
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ]),
      scale: $timeline([
        [0.7, [0.1, 0.1], Easing.inOutQuart],
        [1, [1, 1]]
      ])
    },
    code: {
      translate: $timeline([
        [0.7, [-2000, 0, 0], Easing.inOutQuart],
        [0.9, [0, 180, 0]]
      ])
    }
  };

});
