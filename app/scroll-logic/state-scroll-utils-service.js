angular.module('famous-angular')

.factory('stateScrollUtils', function($rootScope, $state, $famous, $scroll) {

  var Transitionable = $famous['famous/transitions/Transitionable'];

  var scrollProgress = new Transitionable(0);

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

/*--------------------------------------------------------------*/

  return {
    scrollPosition: scrollPosition,
    scrollStates: scrollStates,
    rangePerState: rangePerState,
    stateCount: stateCount,
    scrollRange: scrollRange,
    scrollProgress: function() {
      return scrollProgress;
    }
  };

});
