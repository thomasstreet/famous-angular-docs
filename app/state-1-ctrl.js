angular.module('famous-angular')

.controller('state1Ctrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.grav = new Transitionable(50);
  $scope.gravity =  {
    translate: $timeline([
      [1, [0, 0, -150], Easing.outQuad],
      [50, [0, 0, 0], Easing.inQuad],
      [100, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [1, 0, Easing.outQuad],
      [50, 1, Easing.inQuad],
      [100, 0],
    ])
  };

/*--------------------------------------------------------------*/

  var scrollMax = $rootScope.bodyHeight - window.innerHeight;
  var scrollRange = scrollMax / 7;

  var firstScrollEnd = true;

  var startPosition;
  var startState;

  $(window).bind('scrollstart', function(e) {
    startPosition = window.pageYOffset;
    startState = $state.current.name;
  });

  $(window).bind('scroll', function(e) {
    var currentPosition = window.pageYOffset;
    var delta = (currentPosition - startPosition) || 0;

    var stateScrollRange = {
      start: scrollRange,
      middle: scrollRange + (scrollRange / 2),
      end: scrollRange + scrollRange
    };

    var scrollDirection = delta > 0 ? 'down' : 'up';

    var rangeHalf = currentPosition < stateScrollRange.middle ? 'top' : 'bottom';

    if (!firstScrollEnd) {
      if (rangeHalf === 'top') {
        if (scrollDirection === 'down') {
          return;
        }
      }

      if (rangeHalf === 'bottom') {
        if (scrollDirection === 'up') {
          return;
        }
      }
    }

    var magnitude = $timeline([
      [stateScrollRange.start, 3],
      [stateScrollRange.middle, 1],
      [stateScrollRange.end, 3]
    ])(currentPosition);

    var gravityValue = $timeline([
      [-scrollRange / 2, 1],
      [0, 50],
      [scrollRange / 2, 100]
    ])(delta * magnitude);

    $scope.grav.halt();
    $scope.grav.set(gravityValue, { duration: 0 });
  });

  $(window).bind('scrollend', function(e) {
    firstScrollEnd = false;
    $scope.grav.halt();

    if ($state.current.name !== startState) {
      return;
    }

    $scope.grav.set(50, {duration: 1000, curve: Easing.outElastic});
  });


/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, $done);
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

  $scope.codeBlock = {
    translate: $timeline([
      [0, [0, 150, 0]]
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
        [0.15, [-50, 0, 0], Easing.outQuad],
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
        [0, [20, 65, -0]],
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
        [0.30, [0, 30, 0], Easing.outQuad],
        [0.50, [50, 30, 0]]
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
        [0.40, [50, 60, 0], Easing.outQuad],
        [0.60, [100, 60, 0]]
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
        [0.5, [50, 90, 0], Easing.outQuad],
        [0.7, [100, 90, 0]]
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
        [0, [100, 120, 0]],
        [0.70, [100, 120, 0], Easing.outQuad],
        [1, [150, 120, 0]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.70, 0],
        [1, 1],
      ])
    }
  };

});
