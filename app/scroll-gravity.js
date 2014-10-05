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
      [1, [0, 0, -100]],
      [50, [0, 0, 0]],
      [100, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [1, 0],
      [35, 1],
      [65, 1],
      [100, 0],
    ])
  };

/*--------------------------------------------------------------*/

  // Will be clobbered everytime a new controller is instantiated
  var state = {
    startPosition: 0,
    // Transitionable from a controller
    grav: null
  };

/*--------------------------------------------------------------*/

  $(window).bind('scrollstart', function() {
    if (state.grav) {
      scrollstartHandler(state);
    }
  });

  function scrollstartHandler(state) {
    state.startPosition = window.pageYOffset;
  }

/*--------------------------------------------------------------*/

  var initialPageLoad = true;

  setTimeout(function() {
    initialPageLoad = false;
  }, 50);

  $(window).bind('scroll', function() {
    if (state.grav) {
      scrollHandler(state);
    }
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
      [-scrollRange, 1],
      [0, 50],
      [scrollRange, 100]
    ])(delta);
    //console.log('gravity', gravityValue);

    state.grav.halt();
    state.grav.set(gravityValue, { duration: 0 });
  }

/*--------------------------------------------------------------*/

  $(window).bind('scrollend', function() {
    if (state.grav) {
      scrollendHandler(state);
    }
  });

  function scrollendHandler(state) {
    state.grav.halt();
    state.grav.set(50, {duration: 1000, curve: Easing.outElastic});

    setScrollToMidwayPointofRange();
  }

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
      state = controllerState;
    }
  };

});
