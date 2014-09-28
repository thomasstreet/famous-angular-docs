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
      [0, [220, 190, 0]],
    ])
  };

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -200], Easing.inOutQuad],
      [0.2, [0, 0, 0]],
      [1, [0, 0, 0], Easing.outQuad],
      [2, [0, 0, 100]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 1],
      [1, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.frame = {
    visual: {
      translate: $timeline([
        [0.15, [0, 20, -100], Easing.outQuad],
        [0.35, [0, 0, 0]],
        [1, [0, 0, 0], Easing.inQuad],
        [2, [0, 0, 200]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.15, 0],
        [0.35, 1],
        [1, 1],
        [2, 0]
      ])
    },
    code: {
      translate: $timeline([
        [0.15, [0, 250, 0], Easing.outQuad],
        [0.45, [0, 150, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.15, 0],
        [0.45, 1],
        [1, 1],
        [2, 0]
      ])
    }
  };

  $scope.header = {
    visual: {
      scale: $timeline([
        [0, [0.3, 0.3]],
        [0.30, [0.3, 0.3], Easing.outBack],
        [0.50, [1, 1]],
      ]),
      translate: $timeline([
        [0, [20, 65, -0]],
        [0.30, [20, 65, 0], Easing.inOutQuart],
        [0.50, [20, 65, 0]],
        [1, [20, 65, 0], Easing.inQuad],
        [2, [20, 65, 200]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.30, 0],
        [0.50, 1],
        [1, 1],
        [2, 0]
      ])
    },
    code: {
      translate: $timeline([
        [0.35, [0, 400, 0], Easing.outQuad],
        [0.75, [0, 300, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.35, 0],
        [0.75, 1],
        [1, 1],
        [2, 0]
      ])
    },
  };

  $scope.sidenav = {
    visual: {
      scale: $timeline([
        [0, [0.3, 0.3]],
        [0.40, [0.3, 0.3], Easing.outBack],
        [0.60, [1, 1]],
      ]),
      translate: $timeline([
        [0, [20, 135, -0]],
        [0.40, [20, 135, 0], Easing.inOutQuart],
        [0.60, [20, 135, 0]],
        [1, [20, 135, 0], Easing.inQuad],
        [2, [20, 135, 200]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.40, 0],
        [0.60, 1],
        [1, 1],
        [2, 0]
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
    visual: {
      scale: $timeline([
        [0, [0.3, 0.3]],
        [0.50, [0.3, 0.3], Easing.outBack],
        [0.70, [1, 1]],
      ]),
      translate: $timeline([
        [0, [110, 135, -0]],
        [0.50, [110, 135, 0], Easing.inOutQuart],
        [0.70, [110, 135, 0]],
        [1, [110, 135, 0], Easing.inQuad],
        [2, [110, 135, 200]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.50, 0],
        [0.70, 1],
        [1, 1],
        [2, 0]
      ])
    },
    code: {
      translate: $timeline([
        [0.6, [-2000, 0, 0], Easing.inOutQuart],
        [0.8, [0, 160, 0]]
      ])
    }
  };


  $scope.frameContent = {
    visual: {
      box1: {
        scale: $timeline([
          [0, [0.5, 0.5]],
          [0.60, [0.5, 0.5], Easing.outBack],
          [0.8, [1, 1]],
        ]),
        translate: $timeline([
          [0, [135, 160, 0]],
          [0.60, [135, 160, 0], Easing.inOutQuart],
          [0.80, [135, 160, 0]],
          [1, [135, 160, 0], Easing.inQuad],
          [2, [130, 160, 200]]
        ]),
        opacity: $timeline([
          [0, 0],
          [0.60, 0],
          [0.80, 1],
          [1, 1],
          [2, 0]
        ])
      },
      box2: {
        scale: $timeline([
          [0, [0.5, 0.5]],
          [0.65, [0.5, 0.5], Easing.outBack],
          [0.85, [1, 1]],
        ]),
        translate: $timeline([
          [0, [283, 160, 0]],
          [0.65, [283, 160, 0], Easing.inOutQuart],
          [0.85, [283, 160, 0]],
          [1, [283, 160, 0], Easing.inQuad],
          [2, [283, 160, 200]]
        ]),
        opacity: $timeline([
          [0, 0],
          [0.65, 0],
          [0.85, 1],
          [1, 1],
          [2, 0]
        ])
      },
      box3: {
        scale: $timeline([
          [0, [0.5, 0.5]],
          [0.70, [0.5, 0.5], Easing.outBack],
          [1, [1, 1]],
        ]),
        translate: $timeline([
          [0, [430, 160, 0]],
          [0.70, [430, 160, 0], Easing.inOutQuart],
          //[1, [430, 160, 0]],
          [1, [430, 160, 0], Easing.inQuad],
          [2, [430, 160, 200]]
        ]),
        opacity: $timeline([
          [0, 0],
          [0.70, 0],
          [1, 1],
          //[1, 1],
          [2, 0]
        ])
      }
    },
    code: {
      translate: $timeline([
        [0.7, [-2000, 0, 0], Easing.inOutQuart],
        [0.9, [0, 180, 0]]
      ])
    }
  };

});
