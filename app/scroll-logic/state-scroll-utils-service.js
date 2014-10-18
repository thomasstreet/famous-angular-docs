angular.module('famous-angular')

.factory('stateScrollUtils', function($rootScope, $state, $famous) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var scrollProgress = new Transitionable(0);

/*--------------------------------------------------------------*/

  var RANGE_PER_STATE = 100;
  $rootScope.bodyHeight = bodyHeight;

  function rangePerState() {
    return RANGE_PER_STATE;
  }

  function stateCount() {
    return scrollStates().length;
  }

  function bodyHeight() {
    return (window.innerHeight * stateCount());
  }

  function scrollMax() {
    return bodyHeight() - window.innerHeight;
  }

  function scrollRange() {
    return scrollMax() / stateCount();
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
    bodyHeight: bodyHeight,
    scrollRange: scrollRange,
    scrollMax: scrollMax,
    scrollProgress: function() {
      return scrollProgress;
    }
  };

});
