angular.module('famous-angular')

.run(function($rootScope, $famous, $state, stateUtils) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var progressTimeline = new Transitionable(0);
  $rootScope.progressTimeline = progressTimeline;

  $rootScope.$on('$stateChangeSuccess', function() {
      progressTimeline.halt();
      var newIndex = $state.current.data.index;
      progressTimeline.set((newIndex) + 0.5, {duration: 500});
  });

/*--------------------------------------------------------------*/

  var WAIT_BEFORE_NEXT_STATE_CHANGE = 800;
  var MAXIMUM_SCROLL_DISTANCE = 0.03;

  var preventStateChange;

  $(window).on('mousewheel', function(e) {
    if (preventStateChange) return;

    e.deltaY = correctDeltaY(e.deltaY);

    var newProgressValue = progressTimeline.get() + e.deltaY;

    progressTimeline.halt();
    progressTimeline.set(newProgressValue, { duration: 0 });

    if (traveledFarEnoughForStateChange(newProgressValue)) {
      changeState(e.deltaY); 

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, WAIT_BEFORE_NEXT_STATE_CHANGE);
    }

  });


  function correctDeltaY(deltaY) {
    // Normally 'scrolling' down === -e.deltaY.  But when scrolling down,
    // we want to move the page forward.  Invert the original e.deltaY so that
    // when talking about moving forward, we can use positive numbers.
    deltaY = -deltaY;

    // Our ranges for state changes are between [0, 7], so scale e.deltaY
    // appropriately
    deltaY = deltaY / 100;

    // Force a range of [-MAXIMUM_SCROLL_DISTANCE, MAXIUM_SCROLL_DISTANCE]
    deltaY = Math.min(MAXIMUM_SCROLL_DISTANCE, deltaY);
    deltaY = Math.max(-MAXIMUM_SCROLL_DISTANCE, deltaY);

    return deltaY;
  }


  function traveledFarEnoughForStateChange(newProgressValue) {
    var progressValueStartingPoint = ($state.current.data.index + 0.5);
    var delta = Math.abs(newProgressValue - progressValueStartingPoint);
    return delta > 0.5;
  }


  function changeState(deltaY) {
    var direction = deltaY > 0 ? 'forward' : 'backwards';
    var indexChange = direction === 'forward' ? 1 : -1;
    var currentStateIndex = $state.current.data.index;
    stateUtils.goToStateWithIndex(currentStateIndex + indexChange);
  }

});
