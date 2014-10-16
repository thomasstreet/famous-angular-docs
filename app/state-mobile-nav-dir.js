angular.module('famous-angular')

.directive('mobileNav', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'MobileNavCtrl',
    templateUrl: 'build/templates/state-mobile-nav.html'
  };
})

.controller('MobileNavCtrl', function($rootScope, $scope, $famous, $timeline, stateScrollUtils, $media) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.containerSurfaceOptions = {
    classes: ['set-nav-perspective'],
    size: [undefined, 150]
  };

/*--------------------------------------------------------------*/

  $scope.t = new Transitionable(0);

  $(window).bind('scroll', function() {
    $scope.t.halt();
    var t = getTimelineFromScroll();
    $scope.t.set(t, {duration: 0});
  });

  function getTimelineFromScroll() {
    var scrollMax = stateScrollUtils.scrollMax();
    var stateCount = stateScrollUtils.stateCount();
    var halfOfScrollRange = scrollMax / stateCount / 2;

    var scaleScroll = $timeline([
      [halfOfScrollRange, 0],
      [scrollMax - halfOfScrollRange, 6]
    ]);

    var scrollPosition = window.pageYOffset;
    return scaleScroll(scrollPosition);
  }

  window.setPointer = function(num) {
    $scope.t.set(num, {duration: 1600, curve: Easing.outElastic});
  };

  var isGridMode = false;
  var gridModeTran = new Transitionable(0);

  $scope.toggleGridMode = function() {
    isGridMode = !isGridMode;

    if (isGridMode) {
      gridModeTran.set(1, { duration: 350 });
    } else {
      gridModeTran.set(0, { duration: 350 });
    }
  }

  $scope.rotateX = function($index, timeValue) {
    if (gridModeTran.get()) return 0;

    return $timeline([
      [$index, -Math.PI],
      [$index + 1, 0],
      [$index + 2, Math.PI]
    ])(timeValue);
  };

  $scope.gridModePosition = function($index) {
    return $timeline([
      [0, [0, 0, 0], Easing.outBack],
      [0.8, [0, $index * 100, 0]],
    ])(gridModeTran.get());
  };

  // Resizing surfaces doesn't work that well, so translate the overlay
  // off screen when not in use, to prevent it from gobbling up events.
  $scope.overlay = {
    translate: function() {
      return $timeline([
        [0, [0, -1366, -10]],
        // Translate z-value should be lower than the nav, but above all other
        // content, so that only the nav is unaffected
        [0.01, [0, 0, 9]]
      ])(gridModeTran.get());
    },
    opacity: function() {
      return $timeline([
        [0, 0, Easing.outCubic],
        [1, 0.9]
      ])(gridModeTran.get());
    },
    x: {
      translate: function() {
        return $timeline([
          [0.3, [360, 900, 1000], Easing.outQuad],
          // Translate z-value should be lower than the nav, but above all other
          // content, so that only the nav is unaffected
          [0.6, [360, 900, 10]]
        ])(gridModeTran.get());
      }
    }
  };

  $scope.menuItems = [
    {
      text: 'Render Tree',
      rotateX: $timeline([
        [0, -Math.PI],
        [1, 0],
        [2, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0, Easing.inCubic],
        [1, 1, Easing.outCubic],
        [2, 0]
      ])
    },
    {
      text: 'Data Binding',
      rotateX: $timeline([
        [1, -Math.PI],
        [2, 0],
        [3, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [1, 0],
        [2, 1],
        [3, 0]
      ])
    },
    {
      text: 'Angular Directives',
      rotateX: $timeline([
        [2, -Math.PI],
        [3, 0],
        [4, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [2, 0],
        [3, 1],
        [4, 0]
      ])
    },
    {
      text: 'Organization',
      rotateX: $timeline([
        [3, -Math.PI],
        [4, 0],
        [5, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [3, 0],
        [4, 1],
        [5, 0]
      ])
    },
    {
      text: 'No Compromises',
      rotateX: $timeline([
        [4, -Math.PI],
        [5, 0],
        [6, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [4, 0],
        [5, 1],
        [6, 0]
      ])
    },
    {
      text: 'Download',
      rotateX: $timeline([
        [5, -Math.PI],
        [6, 0],
        [7, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [5, 0],
        [6, 1],
        [7, 0]
      ])
    }
  ];

});
