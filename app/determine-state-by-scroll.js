angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state, scrollEvents, stateScrollUtils) {
  var scrollStates = stateScrollUtils.scrollStates();

/*--------------------------------------------------------------*/

  var start = {
    scrollPosition: window.pageYOffset
  };

  scrollEvents.addListeners.scrollstart(function() {
    start.scrollPosition = window.pageYOffset;
  });

  scrollEvents.addListeners.scrollend(function() {
    start.scrollPosition = window.pageYOffset;
  });

/*--------------------------------------------------------------*/

  scrollEvents.addListeners.scroll(function() {
    // Might not need this anymore:

    // If the page is reloaded with the scroll bar anywhere aside from the
    // default window.pageYOffset = 0, the browser will fire a scroll event.
    // Since the event happens before ui.router changes state,
    // $state.current will be the default empty state.
    if (!$state.current.data) return;

    var t = getTimelineFromScroll();

    var currentStateIndex = $state.current.data.index;
    var reachedStateIndex = stateIndex(determineState(t));

    var direction = compare(reachedStateIndex, currentStateIndex);

    var stateCount = stateScrollUtils.stateCount();
    var nextStateIndex = Math.max(Math.min(stateCount - 1, currentStateIndex + direction), 0);

    var nextState = scrollStates[nextStateIndex];

    // If the nextState is different, change to and stop updating the
    // scrolll progress
    var readyToChangeState = nextState.name !== $state.current.name;
    if (readyToChangeState) {
      $state.go(nextState.name);
      return;
    }

    var scrollProgress = stateScrollUtils.scrollProgress();
    scrollProgress.halt();
    scrollProgress.set(t, { duration: 50 });
  });


  function compare(a, b) {
    if (a == b) return 0;
    return a > b ? 1 : -1;
  }

  function stateIndex(s) {
    return _.findIndex(scrollStates, {name: s});
  }

  function getTimelineFromScroll() {
    var scrollMax = stateScrollUtils.scrollMax();
    var stateCount = stateScrollUtils.stateCount();
    var maxAllowableDistancePerScroll =  scrollMax / stateCount;
    var rangePerState = stateScrollUtils.rangePerState();

    // Scale the scroll range to a simple timeline range
    var scaleScroll = $timeline([
      [0, 0],
      [scrollMax, stateCount * rangePerState]
    ]);

    var scrollPosition = window.pageYOffset;
    var scrollDistanceTraveled = scrollPosition - start.scrollPosition;

    // If the scroll distance exceeds the max allowable distance, return
    // the starting scroll positon + the max distance
    if (Math.abs(scrollDistanceTraveled) > maxAllowableDistancePerScroll) {
      var delta = scrollDistanceTraveled > 0
        ? maxAllowableDistancePerScroll
        : -maxAllowableDistancePerScroll;
      var scaled = scaleScroll(start.scrollPosition + delta);
      var rounded = Math.round(scaled / 50) * 50;
      return rounded;
    }

    return scaleScroll(scrollPosition);
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

});
