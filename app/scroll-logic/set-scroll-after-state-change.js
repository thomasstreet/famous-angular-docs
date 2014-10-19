angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state, stateScrollUtils, $scroll) {

  $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
    determineScrollPositionFromState(toState);

    setScrollProgress();
  });


  function determineScrollPositionFromState(newState) {
    var scrollStates = stateScrollUtils.scrollStates();

    for (var i = 0; i < scrollStates.length; i++) {
      if (newState.name === scrollStates[i].name) {
        var stateCount = stateScrollUtils.stateCount();
        var rangePerState = stateScrollUtils.rangePerState();

        // Set the scroll to half past the beginning of state range
        var halfOfRange = rangePerState / 2;
        var halfwayPointOfRange = scrollStates[i].data.scrollTimelineMax - rangePerState + halfOfRange;

        var newScrollPosition = $timeline([
          [0, 0],
          [stateCount * rangePerState, $scroll.getHeight()]
        ])(halfwayPointOfRange);

        $scroll.setPosition(newScrollPosition);

        break;
      }
    }
  }


  function setScrollProgress() {
    var t = $state.current.data.scrollTimelineMax;
    stateScrollUtils.scrollProgress().set(t - 50, { duration: 500 });
  }


});
