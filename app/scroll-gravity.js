angular.module('famous-angular')

.factory('scrollGravity', function($rootScope, $state, $famous, $timeline, scrollEvents) {
  var Easing = $famous['famous/transitions/Easing'];

  var scrollMax = $rootScope.bodyHeight - window.innerHeight;
  var stateCount = $state.get().filter(function(state) {
    return !!state.data;
  }).length;
  var scrollRange = scrollMax / stateCount;

  var timelines =  {
    translate: $timeline([
      [1, [0, 0, -100]],
      [50, [0, 0, 0]],
      [100, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [1, 0, Easing.inQuad],
      [35, 1],
      [65, 1, Easing.outQuad],
      [100, 0],
    ])
  };

/*--------------------------------------------------------------*/

  // Will be clobbered everytime a new controller is instantiated
  var _state = {
    startPosition: 0,
    // Transitionable from a controller
    grav: null
  };

/*--------------------------------------------------------------*/

  scrollEvents.addListeners.scrollstart(function() {
    if (!_state.grav) return;

    _state.startPosition = window.pageYOffset;
  });

/*--------------------------------------------------------------*/

  var initialPageLoad = true;

  setTimeout(function() {
    initialPageLoad = false;
  }, 50);

  scrollEvents.addListeners.scroll(function() {
    if (!_state.grav) return;

    scrollHandler(_state);
  });

  function scrollHandler(state) {
    if (initialPageLoad) return;

    var index = $state.current.data.index;

    var currentPosition = window.pageYOffset;
    var delta = (currentPosition - state.startPosition) || 0;

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

    var gravityValue = $timeline([
      [-scrollRange / 2, 1],
      [0, 50],
      [scrollRange / 2, 100]
    ])(delta);

    state.grav.halt();
    state.grav.set(gravityValue, { duration: 0 });
  }

/*--------------------------------------------------------------*/

  scrollEvents.addListeners.scrollend(function() {
    if (!_state.grav) return;

    scrollendHandler(_state);
  });

  function scrollendHandler(state) {
    state.grav.halt();
    // Return to resting midway point of range
    state.grav.set(50, {duration: 1000, curve: Easing.outElastic});

    setScrollToMidwayPointofRange();
  }

  // Force the user's scroll to the midway resting point of the range
  function setScrollToMidwayPointofRange() {
    var rangePerState = 100;
    var scrollMax = $rootScope.bodyHeight - window.innerHeight;

    var newScrollPosition = $timeline([
      [0, 0],
      [stateCount * rangePerState, scrollMax]
    ])($state.current.data.scrollTimelineMax - (rangePerState / 2));

    window.scrollTo(0, newScrollPosition);
  }

/*--------------------------------------------------------------*/

  return {
    timelines: timelines,
    setState: function(controllerState) {
      _state = controllerState;
      _state.startPosition = window.pageYOffset;
    }
  };

});
