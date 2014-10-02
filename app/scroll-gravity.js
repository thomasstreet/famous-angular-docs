angular.module('famous-angular')

.factory('scrollGravity', function($rootScope, $state, $famous, $timeline) {
  var Easing = $famous['famous/transitions/Easing'];

  var scrollMax = $rootScope.bodyHeight - window.innerHeight;
  var stateCount = $state.get().filter(function(state) {
    return !!state.data;
  }).length;
  var scrollRange = scrollMax / stateCount;

  var timelines =  {
    translate: $timeline([
      [1, [0, 0, -150], Easing.inQuad],
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

  function scrollstartHandler(start) {
    start.position = window.pageYOffset;
  }

/*--------------------------------------------------------------*/

  var initialPageLoad = true;

  setTimeout(function() {
    initialPageLoad = false;
  }, 50);

  function scrollHandler(grav, start, index) {
    if (initialPageLoad) return;

    var currentPosition = window.pageYOffset;
    var delta = (currentPosition - start.position) || 0;

    var stateScrollRange = {
      start: (scrollRange * index),
      middle: (scrollRange * index) + (scrollRange / 2),
      end: (scrollRange * index) + scrollRange
    };

    var scrollDirection = delta > 0 ? 'down' : 'up';

    var rangeHalf = currentPosition < stateScrollRange.middle ? 'top' : 'bottom';

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

    var magnitude = $timeline([
      [stateScrollRange.start, 2],
      [stateScrollRange.middle, 1],
      [stateScrollRange.end, 2]
    ])(currentPosition);

    var gravityValue = $timeline([
      [-scrollRange / 2, 1],
      [0, 50],
      [scrollRange / 2, 100]
    ])(delta * magnitude);

    grav.halt();
    grav.set(gravityValue, { duration: 0 });
  }

/*--------------------------------------------------------------*/

  function scrollendHandler(grav, start) {
    grav.halt();

    if ($state.current.name !== start.state) {
      return;
    }

    grav.set(50, {duration: 1000, curve: Easing.outElastic});
  }

/*--------------------------------------------------------------*/

  return {
    timelines: timelines,
    scrollstartHandler: scrollstartHandler,
    scrollHandler: scrollHandler,
    scrollendHandler: scrollendHandler
  };

});
