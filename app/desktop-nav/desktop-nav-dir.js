angular.module('famous-angular')

.directive('desktopNav', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'DesktopNavCtrl',
    templateUrl: 'build/templates/desktop-nav.html'
  };
})

.controller('DesktopNavCtrl', function($rootScope, $scope, $famous, $timeline, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var navTimeline = new Transitionable(0);
  $scope.navTimeline = navTimeline;

/*--------------------------------------------------------------*/

  $scope.navbar = {
    opacity: $timeline([
      [0, 0],
      [1, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    $scope.navTimeline.halt();

    var delay = getDelay(fromState) + $rootScope.DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS;

    $scope.navTimeline.delay(delay);

    if (isIntroState()) {
      $scope.navTimeline.set(0, {duration: 400});
    } else {
      $scope.navTimeline.set(1, {duration: 400});
    } 

    function getDelay(prevState) {
      if (!prevState.data) return 0;
      return prevState.data.leaveAnimationDuration;
    }

    function isIntroState() {
      return toState.name === 'intro';
    }
  });

/*--------------------------------------------------------------*/

  // Code for the blue progress dots below the nav
  $scope.progressDots = {
    dot1: {
      translate: $timeline([
        [0.5, [-160, 0, 0], Easing.inQuart],
        [1.5, [0, 0, 0], Easing.inQuart],
        [2.5, [170, 0, 0], Easing.inQuart],
        [3.5, [375, 0, 0], Easing.inQuart],
        [4.5, [575, 0, 0], Easing.inQuart],
        [5.5, [785, 0, 0], Easing.inQuart],
        [6.5, [985, 0, 0], Easing.inQuart],
      ]),
      opacity: $timeline([
        [0.5, 0, Easing.inQuad],
        [1.5, 1],
        [5.5, 1, Easing.inQuad],
        [6.5, 0]
      ])
    },
    dot2: {
      translate: $timeline([
        [0.5, [-150, 0, 0], Easing.inCubic],
        [1.5, [10, 0, 0], Easing.inCubic],
        [2.5, [180, 0, 0], Easing.inCubic],
        [3.5, [385, 0, 0], Easing.inCubic],
        [4.5, [585, 0, 0], Easing.inCubic],
        [5.5, [795, 0, 0], Easing.inCubic],
        [6.5, [995, 0, 0], Easing.inCubic],
      ]),
      opacity: $timeline([
        [0.5, 0, Easing.inQuad],
        [1.5, 1],
        [5.5, 1, Easing.inQuad],
        [6.5, 0]
      ])
    },
    dot3: {
      translate: $timeline([
        [0.5, [-140, 0, 0], Easing.inQuad],
        [1.5, [20, 0, 0], Easing.inQuad],
        [2.5, [190, 0, 0], Easing.inQuad],
        [3.5, [395, 0, 0], Easing.inQuad],
        [4.5, [595, 0, 0], Easing.inQuad],
        [5.5, [805, 0, 0], Easing.inQuad],
        [6.5, [1005, 0, 0], Easing.inQuad],
      ]),
      opacity: $timeline([
        [0.5, 0, Easing.inQuad],
        [1.5, 1],
        [5.5, 1, Easing.inQuad],
        [6.5, 0]
      ])
    }
  };

});
