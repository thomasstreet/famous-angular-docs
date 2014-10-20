angular.module('famous-angular')

.factory('stateUtils', function($rootScope, $state, $famous) {

/*--------------------------------------------------------------*/

  function stateCount() {
    return scrollStates().length;
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
    stateCount: stateCount,
    goToStateWithIndex: goToStateWithIndex,
    getStateByIndex: getStateByIndex
  };

});
