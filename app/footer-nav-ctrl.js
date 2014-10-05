angular.module('famous-angular')

.controller('footerNavCtrl', function($rootScope, $scope, $famous, $timeline) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.navTimeline = new Transitionable(0);

/*--------------------------------------------------------------*/

  $scope.navbar = {
    opacity: $timeline([
      [0, 0],
      [1, 1]
    ])
  };

  $scope.footer = {
    opacity: $timeline([
      [0, 0],
      [1, 1]
    ]),
    translate: $timeline([
      [0, [0, -40, 0]],
      [1, [0, -40, 0], Easing.outBack],
      [2, [0, -770, 0], Easing.outBounce],
      [3, [0, -40, 0]]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $scope.navTimeline.halt();

    var delay = getDelay(fromState) + $rootScope.DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS;

    $scope.navTimeline.delay(delay);

    if (goingToIntroState()) {
      $scope.navTimeline.set(0, {duration: 400});
      return;
    } 
    
    if (goingToEndState()) {
      $scope.navTimeline.set(1, {duration: 0}, function() {
        $scope.navTimeline.set(2, {duration: 400});
      });
      return;
    }

    if (leavingEndState()) {

      // Use a shorter delay when leaving end state, as end state does not
      // have a leave animation
      $scope.navTimeline.halt();
      $scope.navTimeline.delay(100);

      $scope.navTimeline.set(3, {duration: 700}, function() {
        $scope.navTimeline.set(1, {duration: 0});
      });
      return;
    }

    // Must be a state between 1 - 5, so always show sidebar
    $scope.navTimeline.set(1, {duration: 500});
    return;

    function getDelay(prevState) {
      if (!prevState.data) return 0;
      return prevState.data.leaveAnimationDuration;
    }

    function goingToIntroState() {
      return toState.data.index === 0;
    }

    function goingToEndState() {
      return toState.data.index === 6;
    }

    function leavingEndState() {
      if (!fromState.data) return false;
      return fromState.data.index === 6;
    }

  });

/*--------------------------------------------------------------*/

  window.rootScope = $rootScope;

  var maxRange = 700;

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
