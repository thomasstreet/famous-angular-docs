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

  window.onscroll = function() {
    // Initial routing from page laod will set the scroll position, but 
    // don't want to execute handler for that scrollTo()
    if (!initialPageLoad) {
      var t = getTimelineFromScroll();
      determineState(t);
    }
  };

  function getTimelineFromScroll() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight - window.innerHeight;

    // Scale the scroll range to a simple timeline of [0, n * 100]
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
        $state.go(state.name);
        break;
      }
    }
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
          [(stateCount - 1) * rangePerState, scrollMax]
        ])(beginningOfStateRange);

        window.scrollTo(0, newScrollY);
        console.log(window.pageYOffset);
        break;
      }
    }
  }

});
