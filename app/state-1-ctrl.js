angular.module('famous-angular')

.controller('state1Ctrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, scrollGravity, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

/*--------------------------------------------------------------*/

  $scope.grav = new Transitionable(50);
  $scope.gravity = scrollGravity.timelines;

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    scrollGravity.setState({
      grav: $scope.grav,
      startPosition: window.pageYOffset
    });

    stateTransitions.enter(t, function() {
      $done();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inCubic],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $media.$sheet('State1Sheet', {

    xs: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [10, 150, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [85, 330, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code-block': {
        transform: function() {
          var translate = $timeline([
            [0, [-5, 625, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      }
    },


    sm: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [220, 190, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [1050, 190, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code-block': {
        transform: function() {
          var translate = $timeline([
            [0, [0, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      }
    }

  });

  $scope.leftColumn = {
    translate: $timeline([
      [0, [220, 190, 0]],
    ])
  };

  $scope.rightColumn = {
    translate: $timeline([
      [0, [1050, 190, 0]],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -200], Easing.inOutQuad],
      [0.2, [0, 0, 0]],
      [1, [0, 0, 0]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 1],
      [1, 1],
    ])
  };

  $scope.frame = {
    visual: {
      translate: $timeline([
        [0.15, [0, 20, -100], Easing.outQuad],
        [0.35, [0, 0, 0]],
        [1, [0, 0, 0]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.15, 0],
        [0.35, 1],
        [1, 1],
      ])
    },
    code: {
      translate: $timeline([
        [0.15, [-30, 0, 0], Easing.outQuad],
        [0.45, [0, 0, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.15, 0],
        [0.45, 1],
        [1, 1],
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
        [0, [20, 65, 0]],
        [0.30, [20, 65, 0], Easing.inOutQuart],
        [0.50, [20, 65, 0]],
        [1, [20, 65, 0]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.30, 0],
        [0.50, 1],
        [1, 1],
      ])
    },
    code: {
      translate: $timeline([
        [0.30, [0, 35, 0], Easing.outQuad],
        [0.50, [30, 35, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.30, 0],
        [0.50, 1],
        [1, 1],
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
      ]),
      opacity: $timeline([
        [0, 0],
        [0.40, 0],
        [0.60, 1],
        [1, 1],
      ])
    },
    code: {
      translate: $timeline([
        [0.40, [30, 71, 0], Easing.outQuad],
        [0.60, [60, 71, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.50, 0],
        [0.60, 1],
        [1, 1],
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
      ]),
      opacity: $timeline([
        [0, 0],
        [0.50, 0],
        [0.70, 1],
        [1, 1],
      ])
    },
    code: {
      translate: $timeline([
        [0.5, [30, 108, 0], Easing.outQuad],
        [0.7, [60, 108, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.5, 0],
        [0.7, 1],
        [1, 1],
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
        ]),
        opacity: $timeline([
          [0, 0],
          [0.60, 0],
          [0.80, 1],
          [1, 1],
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
        ]),
        opacity: $timeline([
          [0, 0],
          [0.65, 0],
          [0.85, 1],
          [1, 1],
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
          [1, [430, 160, 0], Easing.inQuad],
        ]),
        opacity: $timeline([
          [0, 0],
          [0.70, 0],
          [1, 1],
        ])
      }
    },
    code: {
      translate: $timeline([
        [0.70, [60, 145, 0], Easing.outQuad],
        [1, [90, 145, 0]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.70, 0],
        [1, 1],
      ])
    }
  };


});
