angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state, scrollEvents, stateScrollUtils) {

  $rootScope.$on('$stateChangeSuccess', function(e) {
    determineScrollPositionFromState();

    setScrollProgress();
  });


  function determineScrollPositionFromState() {
    var scrollStates = stateScrollUtils.scrollStates();

    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if ($state.current.name === state.name) {
        var stateCount = stateScrollUtils.stateCount();
        var rangePerState = stateScrollUtils.rangePerState();

        // Set the scroll to half past the beginning of state range
        var halfOfRange = rangePerState / 2;
        var halfwayPointOfRange = state.data.scrollTimelineMax - rangePerState + halfOfRange;

        var scrollMax = stateScrollUtils.scrollMax();

        var newScrollPosition = $timeline([
          [0, 0],
          [stateCount * rangePerState, scrollMax]
        ])(halfwayPointOfRange);

        window.scrollTo(0, newScrollPosition);

        break;
      }
    }
  }


  function setScrollProgress() {
    var t = $state.current.data.scrollTimelineMax;
    stateScrollUtils.scrollProgress().set(t - 50, { duration: 500 });
  }


});
