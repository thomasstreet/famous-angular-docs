angular.module('famous-angular')

.factory('stateScrollUtils', function($rootScope, $state, $famous) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var scrollProgress = new Transitionable(0);

/*--------------------------------------------------------------*/

  var rangePerState = 100;
  var scrollStates = getScrollStates();
  var stateCount = scrollStates.length;
  var bodyHeight = (window.innerHeight * stateCount);
  $rootScope.bodyHeight = bodyHeight;

  function scrollMax() {
    return bodyHeight - window.innerHeight;
  }

  function scrollRange() {
    return scrollMax() / stateCount;
  }

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

  return {
    getScrollStates: getScrollStates,
    rangePerState: function() {
      return rangePerState;
    },
    stateCount: function() {
      return stateCount;
    },
    bodyHeight: function() {
      return bodyHeight;
    },
    scrollProgress: function() {
      return scrollProgress;
    },
    scrollRange: scrollRange,
    scrollMax: scrollMax
  };

});
