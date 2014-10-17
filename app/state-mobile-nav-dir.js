angular.module('famous-angular')

.directive('mobileNav', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'MobileNavCtrl',
    templateUrl: 'build/templates/state-mobile-nav.html'
  };
})

.controller('MobileNavCtrl', function($rootScope, $scope, $state, $famous, $timeline, stateScrollUtils, $media) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.containerSurfaceOptions = {
    classes: ['set-nav-perspective'],
    size: [undefined, 150]
  };

/*--------------------------------------------------------------*/

  $scope.menuItems = [
    {
      text: 'Render Tree',
      state: '1'
    },
    {
      text: 'Data Binding',
      state: '2'
    },
    {
      text: 'Angular Directives',
      state: '3'
    },
    {
      text: 'Organization',
      state: '4'
    },
    {
      text: 'No Compromises',
      state: '5'
    },
    {
      text: 'Download',
      state: 'download'
    }
  ];

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

/*--------------------------------------------------------------*/

  var isGridMode = false;
  var gridModeTran = new Transitionable(0);
  $scope.gridModeT = gridModeTran;

  $scope.gridMode = {
    toggle: function(state) {
      isGridMode = !isGridMode;

      if (isGridMode) {
        gridModeTran.set(1, { duration: 350 });
      } else {
        gridModeTran.set(0, { duration: 350 }, function() {
          if (state) $state.go(state);
        });
      }
    },
    translate: function($index, gridModeTimeValue) {
      return $timeline([
        [0, [0, 0, 0], Easing.outBack],
        [0.8, [0, $index * 150 + 120, 0]],
      ])(gridModeTimeValue);
    }
  };

  $scope.tile = {
    scale: $timeline([
      [0, [0.75, 0.75], Easing.inQuad],
      [0.5, [1, 1]]
    ]),
    rotateX: function($index, timeValue) {
      if (gridModeTran.get()) return 0;

      return $timeline([
        [$index, -Math.PI],
        [$index + 1, 0],
        [$index + 2, Math.PI]
      ])(timeValue);
    },
    isCurrentState: function(state) {
      return $state.current.name === state;
    }
  };


/*--------------------------------------------------------------*/

  // Resizing surfaces doesn't work that well, so translate the overlay
  // off screen when not in use, to prevent it from gobbling up events.
  $scope.overlay = {
    translate: $timeline([
      [0, [0, -1366, -10]],
      // Translate z-value should be lower than the nav, but above all other
      // content, so that only the nav is unaffected
      [0.01, [0, 0, 9]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.outCubic],
      [1, 0.85]
    ]),

    xIcon: {
      translate: $timeline([
        [0.1, [360, 1090, 1000], Easing.outQuad],
        // Translate z-value should be lower than the nav, but above all other
        // content, so that only the nav is unaffected
        [0.5, [360, 1090, 10]]
      ])
    }
  };

});
