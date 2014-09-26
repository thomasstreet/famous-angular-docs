angular.module('famous-angular')

.controller('homepageCtrl', function($scope, $famous, $timeline) {

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    // Make sure that fa-app contains the class for both the previous state
    // and current state, to ensure the correct CSS namespacing when
    // transitioning between views with fa-animate-enter/leave
    var classes = [
      toState.data.cssClass,
      (fromState && fromState.data) ? fromState.data.cssClass : ''
    ].join(' ');

    $scope.stateClasses = classes;
  });

/*--------------------------------------------------------------*/

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.navTimeline = new Transitionable(0);

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
      [1, [0, -40, 0], Easing.inOutQuart],
      [2, [0, -770, 0]]
    ])
  };

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    var animationDuration = 500;

    $scope.navTimeline.halt();

    var delay = getDelay(fromState);
    $scope.navTimeline.delay(delay);

    if (goingToIntroState()) {
      $scope.navTimeline.set(0, {duration: animationDuration});
      return;
    } 
    
    if (goingToEndState()) {
      $scope.navTimeline.set(1, {duration: 0}, function() {
        $scope.navTimeline.set(2, {duration: animationDuration});
      });
      return;
    }

    // Must be a state between 1 - 5, so always show sidebar
    $scope.navTimeline.set(1, {duration: animationDuration});
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

  });

});
