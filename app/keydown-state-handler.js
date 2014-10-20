angular.module('famous-angular')

.run(function($state) {

  var FORCE_THRESHOLD = 50;
  var WAIT_BEFORE_NEXT_STATE_CHANGE = 800;

  var preventStateChange;

  $(window).on('mousewheel', function(e) {
    if (preventStateChange) return;

    // If scrolling upwards with enough force, go back a state
    if (e.deltaY >= FORCE_THRESHOLD) {
      goToStateWithIndex($state.current.data.index - 1);

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, WAIT_BEFORE_NEXT_STATE_CHANGE);
    }

    // If scrolling downwards with enough force, go forward a state
    if (e.deltaY <= -FORCE_THRESHOLD) {
      goToStateWithIndex($state.current.data.index + 1);

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, WAIT_BEFORE_NEXT_STATE_CHANGE);
    }
  });





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
    return null;
  }

});
