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
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var navTimeline = new Transitionable(0);
  $scope.navTimeline = navTimeline;
  $scope.scrollProgress = stateScrollUtils.scrollProgress();

  $scope.navOptions = {
    classes: ['set-nav-perspective'],
    size: [undefined, 150]
  };

/*--------------------------------------------------------------*/

  $(window).bind('scroll', function() {
    _pointer.halt();
    var t = getTimelineFromScroll();
    _pointer.set(t, {duration: 300});
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


  var _pointer = new Transitionable(0);
  window.setPointer = function(num) {
    _pointer.set(num, {duration: 300});
  };

  $scope.itemSize = [420, 90];

  $scope.getTranslate = function($index) {
    var position = $index - _pointer.get();
    var xTranslate = position * ($scope.itemSize[0] - 0);
    return [xTranslate, 0, 0];
  };

  $scope.getRotateY = function($index) {
    var position = $index - _pointer.get();
    return (6.28 / 7) * position;
  };

  $scope.getOpacity = function($index) {
    var position = $index - _pointer.get();
    position = Math.abs(position);

    return 1 - position + 0.5;
  };

  $scope.getOrigin = function($index) {
    return [0.5, 0.5];


    var position = $index - _pointer.get();
    var xOrigin = 0.5;

    var cappedPosition = Math.max(Math.min(position, 1), -1);

    xOrigin += -cappedPosition * 0.5;

    console.log('index', $index, 'xOrigin', xOrigin);

    return [xOrigin, 0.5];
  };

  $scope.menuItems = [
    {
      text: 'Intro',
      color: 'blue'
    },
    {
      text: 'Render Tree',
      color: 'red'
    },
    {
      text: 'Data Binding',
      color: 'blue'
    },
    {
      text: 'Angular Directives',
      color: 'red'
    },
    {
      text: 'Organization',
      color: 'blue'
    },
    {
      text: 'No Compromises',
      color: 'red'
    },
    {
      text: 'Download',
      color: 'blue'
    }
  ]

/*--------------------------------------------------------------*/

  $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
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
