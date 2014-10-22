angular.module('famous-angular')

.run(function($state, stateUtils) {

  window.addEventListener('keydown', function(e) {
    // If typing in a text box, allow for arrow key movement without triggering
    // state change
    if (e.target.tagName.toLowerCase() === 'input') return;

    var key = e.keyCode;

    // If key is left, go back a state
    if (key === 37) {
      var desiredIndex = $state.current.data.index - 1;
      stateUtils.goToStateWithIndex(desiredIndex);
    }

    // If key is right, go forward a state
    if (key === 39) {
      var desiredIndex = $state.current.data.index + 1;
      stateUtils.goToStateWithIndex(desiredIndex);
    }
  });

});
