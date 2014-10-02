angular.module('famous-angular')

.controller('scrollEventsCtrl', function($rootScope, $scope, $famous, $timeline, stateTransitions) {

  console.log('parent', $scope.$id);

  var Easing = $famous['famous/transitions/Easing'];

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

  var stateScrollRange = {
    start: scrollRange,
    middle: scrollRange + (scrollRange / 2),
    end: scrollRange + scrollRange
  };

  $scope.scrollstartHandler = function() {
    $scope.data.startPosition = window.pageYOffset;
  };

  $scope.scrollHandler = function() {
    var currentPosition = window.pageYOffset;
    var delta = (currentPosition - $scope.data.startPosition);

    var scrollDirection = delta > 0 ? 'down' : 'up';

    var rangeHalf = currentPosition < stateScrollRange.middle ? 'top' : 'bottom';

    if (!$scope.data.firstScrollEnd) {
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

    console.log('data', $scope.data.firstScrollEnd, $scope.data);
    if (!$scope.data.grav) return;
    $scope.data.grav.halt();
    $scope.data.grav.set(gravityValue, { duration: 0 });
  };


  $scope.scrollendHandler = function(e) {
    if (!$scope.data.grav) return;
    $scope.data.firstScrollEnd = false;
    $scope.data.grav.halt();
    $scope.data.grav.set(50, {duration: 1000, curve: Easing.outElastic});
  };

});
