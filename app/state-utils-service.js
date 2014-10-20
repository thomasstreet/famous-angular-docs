angular.module('famous-angular')

.factory('stateUtils', function($rootScope, $state, $famous, $scroll) {

/*--------------------------------------------------------------*/

  var RANGE_PER_STATE = 100;
  function rangePerState() {
    return RANGE_PER_STATE;
  }

  function stateCount() {
    return scrollStates().length;
  }

  function scrollRange() {
    return $scroll.getHeight() / stateCount();
  }

  function scrollStates() {
    var listOfStates = $state.get();
    var usableStates = listOfStates.filter(function(state) {
      return !!state.data;
    });
    var orderedStates = _.sortBy(usableStates, function(state) {
      return state.data.index;
    });
    return orderedStates;
  }

  function scrollPosition() {
    return $('#scroll-container').scrollTop();
  }

  function goToStateWithIndex(desiredIndex) {
    var desiredState = getStateByIndex(desiredIndex);

    if (desiredState) {
      $state.go(desiredState.name);
    }
  }

  function getStateByIndex(index) {
    var stateList = $state.get();
    for (var i = 0; i < stateList.length; i++) {
      var state = stateList[i];
      if (state.data && state.data.index === index) {
        return state;
      }
    }
    return null;
  }



/*--------------------------------------------------------------*/

  return {
    scrollPosition: scrollPosition,
    scrollStates: scrollStates,
    rangePerState: rangePerState,
    stateCount: stateCount,
    scrollRange: scrollRange,
    goToStateWithIndex: goToStateWithIndex,
    getStateByIndex: getStateByIndex
  };

});
