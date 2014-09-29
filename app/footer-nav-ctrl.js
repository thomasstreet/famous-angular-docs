angular.module('famous-angular')

.controller('footerNavCtrl', function($scope, $famous, $timeline) {

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

    $scope.navTimeline.halt();

    var delay = getDelay(fromState);
    $scope.navTimeline.delay(delay);

    if (goingToIntroState()) {
      $scope.navTimeline.set(0, {duration: 300});
      return;
    } 
    
    if (goingToEndState()) {
      $scope.navTimeline.set(1, {duration: 0}, function() {
        $scope.navTimeline.set(2, {duration: 500});
      });
      return;
    }

    // Must be a state between 1 - 5, so always show sidebar
    $scope.navTimeline.set(1, {duration: 300});
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
