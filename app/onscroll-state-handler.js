angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state) {
  $rootScope.bodyHeight = 5000;

  var rangePerState = 100;
  var stateCount = 7;
  var scrollStates = [
    { max: 100, name: 'intro' },
    { max: 200, name: '1' },
    { max: 300, name: '2' },
    { max: 400, name: '3' },
    { max: 500, name: '4' },
    { max: 600, name: '5' },
    { max: 700, name: 'end' }
  ];

  var initialPageLoad = true;

  var throttledGo = _.throttle($state.go.bind($state), 1000);

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
      [0, 0, function(x) { return x }],
      [scrollMax, stateCount * rangePerState]
    ])(pageYOffset);

    return t;
  }

  function determineState(t) {
    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (t < state.max) {
        return state.name;
      }
    }
    return "end";
  }

  $rootScope.$on('$stateChangeSuccess', function(e) {
    determineScrollPositionFromState();
    if (initialPageLoad) {
      initialPageLoad = false;
    }
  });


  function determineScrollPositionFromState() {
    var newState = $state.current;

    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (newState.name === state.name) {

        // Set the scroll to half past the beginning of state range
        var beginningOfStateRange = state.max - rangePerState + 50;

        var scrollMax = $rootScope.bodyHeight - window.innerHeight;

        var newScrollY = $timeline([
          [0, 0, function(x) { return x }],
          [(stateCount) * rangePerState, scrollMax]
        ])(beginningOfStateRange);

        window.scrollTo(0, newScrollY);

        break;
      }
    }
  }

});
