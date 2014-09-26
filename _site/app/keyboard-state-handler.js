angular.module('famous-angular')

.run(function($state) {

  window.addEventListener('keydown', function(e) {
    var key = e.keyCode;

    // If key is left, go back a state
    if (key === 37) {
      var desiredIndex = $state.current.data.index - 1;
      goToStateWithIndex(desiredIndex);
    }

    // If key is right, go forward a state
    if (key === 39) {
      var desiredIndex = $state.current.data.index + 1;
      goToStateWithIndex(desiredIndex);
    }

  });

  function goToStateWithIndex(desiredIndex) {
    var desiredState = getState(desiredIndex);

    if (desiredState) {
      $state.go(desiredState.name);
    }
  }

  function getState(index) {
    var stateList = $state.get();
    for (var i = 0; i < stateList.length; i++) {
      var state = stateList[i];
      if (state.data && state.data.index === index) {
        return state;
      }
    }
  }

});
