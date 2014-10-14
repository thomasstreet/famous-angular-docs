angular.module('famous-angular')

.directive('desktopNav', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'DesktopNavCtrl',
    templateUrl: 'build/templates/state-desktop-nav.html'
  };
})

.controller('DesktopNavCtrl', function($rootScope, $scope, $famous, $timeline, stateScrollUtils, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var navTimeline = new Transitionable(0);
  $scope.navTimeline = navTimeline;
  $scope.scrollProgress = stateScrollUtils.scrollProgress();

/*--------------------------------------------------------------*/

  $scope.navbar = {
    opacity: $timeline([
      [0, 0],
      [1, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $scope.navTimeline.halt();

    var delay = getDelay(fromState) + $rootScope.DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS;

    $scope.navTimeline.delay(delay);

    if (notIntroState()) {
      $scope.navTimeline.set(1, {duration: 400});
    } else {
      $scope.navTimeline.set(0, {duration: 400});
    } 

    function getDelay(prevState) {
      if (!prevState.data) return 0;
      return prevState.data.leaveAnimationDuration;
    }

    function notIntroState() {
      return toState.data.index !== 0;
    }
  });

/*--------------------------------------------------------------*/

  // Code for the blue progress dots below the nav
  $scope.scrollProgressDots = {
    dot1: {
      translate: $timeline([
        [50, [-160, 0, 0], Easing.inQuart],
        [150, [0, 0, 0], Easing.inQuart],
        [250, [170, 0, 0], Easing.inQuart],
        [350, [375, 0, 0], Easing.inQuart],
        [450, [575, 0, 0], Easing.inQuart],
        [550, [785, 0, 0], Easing.inQuart],
        [650, [985, 0, 0], Easing.inQuart],
      ]),
      opacity: $timeline([
        [50, 0, Easing.inQuad],
        [150, 1],
        [550, 1, Easing.inQuad],
        [650, 0]
      ])
    },
    dot2: {
      translate: $timeline([
        [50, [-150, 0, 0], Easing.inCubic],
        [150, [10, 0, 0], Easing.inCubic],
        [250, [180, 0, 0], Easing.inCubic],
        [350, [385, 0, 0], Easing.inCubic],
        [450, [585, 0, 0], Easing.inCubic],
        [550, [795, 0, 0], Easing.inCubic],
        [650, [995, 0, 0], Easing.inCubic],
      ]),
      opacity: $timeline([
        [50, 0, Easing.inQuad],
        [150, 1],
        [550, 1, Easing.inQuad],
        [650, 0]
      ])
    },
    dot3: {
      translate: $timeline([
        [50, [-140, 0, 0], Easing.inQuad],
        [150, [20, 0, 0], Easing.inQuad],
        [250, [190, 0, 0], Easing.inQuad],
        [350, [395, 0, 0], Easing.inQuad],
        [450, [595, 0, 0], Easing.inQuad],
        [550, [805, 0, 0], Easing.inQuad],
        [650, [1005, 0, 0], Easing.inQuad],
      ]),
      opacity: $timeline([
        [50, 0, Easing.inQuad],
        [150, 1],
        [550, 1, Easing.inQuad],
        [650, 0]
      ])
    }
  };

});
