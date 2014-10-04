angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state) {
  var rangePerState = 100;
  var scrollStates = getScrollStates();
  var stateCount = scrollStates.length;
  $rootScope.bodyHeight = (window.innerHeight * stateCount);

  function getScrollStates() {
    var listOfStates = $state.get();
    var usableStates = listOfStates.filter(function(state) {
      return !!state.data;
    });
    var orderedStates = _.sortBy(usableStates, function(state) {
      return state.data.index;
    });
    return orderedStates;
  }


/*--------------------------------------------------------------*/


  var initialPageLoad = true;

  var throttledGo = _.throttle(function(stateName) {
    $state.go(stateName, null, { location: 'replace' });
  }, 1000);

  window.onscroll = function(e) {
    // Initial routing from page laod will set the scroll position, but 
    // don't want to execute handler for that scrollTo()

    if (initialPageLoad) return;

    var t = getTimelineFromScroll();


    var compare = function(a, b) {
      if (a == b) return 0;
      return a > b ? 1 : -1
    }

    var stateIndex = function(s) {
      return _.findIndex(scrollStates, {name: s});
    };

    var currentState = stateIndex($state.current.name);
    var reachedState = stateIndex(determineState(t));
    var direction = compare(reachedState, currentState);
    var nextState = Math.max(Math.min(stateCount - 1, currentState + direction), 0);

    throttledGo(scrollStates[nextState].name);
  };

  function getTimelineFromScroll() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight - window.innerHeight;

    // Scale the scroll range to a simple timeline range
    t = $timeline([
      [0, 0],
      [scrollMax, stateCount * rangePerState]
    ])(pageYOffset);

    $rootScope.scrollProgress = t;

    return t;
  }

  function determineState(t) {
    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (t <= state.data.scrollTimelineMax) {
        return state.name;
      }
    }
    return "end";
  }


/*--------------------------------------------------------------*/


  $rootScope.$on('$stateChangeSuccess', function(e) {
    determineScrollPositionFromState();
    if (initialPageLoad) {
      initialPageLoad = false;
    }
  });


  function determineScrollPositionFromState() {
    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if ($state.current.name === state.name) {
        // Set the scroll to half past the beginning of state range
        var halfOfRange = rangePerState / 2;
        var halfwayPointOfRange = state.data.scrollTimelineMax - rangePerState + halfOfRange;

        var scrollMax = $rootScope.bodyHeight - window.innerHeight;

        var newScrollPosition = $timeline([
          [0, 0],
          [stateCount * rangePerState, scrollMax]
        ])(halfwayPointOfRange);

        window.scrollTo(0, newScrollPosition);

        break;
      }
    }
  }

});
