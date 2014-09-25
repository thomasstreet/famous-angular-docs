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
      [0, [0, -40, -200], Easing.inQuad],
      [0.5, [0, -40, 0]],
      [1, [0, -40, 0], Easing.inCubic],
      [2, [0, -760, 0]]
    ])
  };

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $scope.navTimeline.halt();

    var delay = getDelay(fromState);
    $scope.navTimeline.delay(delay);

    if (toState.data.index === 0) {
      $scope.navTimeline.set(0, {duration: 500});
    } else if (toState.data.index === 6) {
      $scope.navTimeline.set(1, {duration: 0});
      $scope.navTimeline.set(2, {duration: 500});
    } else {

      // If transition from 'end' state to any other state, halt() the delay()
      // set
      if (fromState.data && fromState.data.index === 6) {
        $scope.navTimeline.halt();
      }

      $scope.navTimeline.set(1, {duration: 500});
    }
  });

  function getDelay(prevState) {
    if (!prevState.data) return 0;
    return prevState.data.leaveAnimationDuration;
  }

});
