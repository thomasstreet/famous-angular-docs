angular.module('famous-angular')

.run(function($rootScope, $famous, $state, stateUtils) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];
  var scrollProgress = new Transitionable(0);
  $rootScope.scrollProgress = scrollProgress;

  var FORCE_THRESHOLD = 40;
  var WAIT_BEFORE_NEXT_STATE_CHANGE = 800;


  $(window).on('mousewheel', function(e) {
    var delta = Math.max(-5, Math.min(5, e.deltaY));
    var newValue = Math.max(0, scrollProgress.get() + delta);

    var delta = Math.abs(newValue - $state.current.data.index * 100);
    if (delta > 50) {
      var newIndex = $state.current.data.index - 1;
      stateUtils.goToStateWithIndex(newIndex);
      return;
    }

    scrollProgress.set(newValue, { duration:0 });
  });


  var preventStateChange;
  $(window).on('mousewheel', function(e) {
    if (preventStateChange) return;

    // If scrolling upwards with enough force, go back a state
    if (e.deltaY >= FORCE_THRESHOLD) {
      var newIndex = $state.current.data.index - 1;
      stateUtils.goToStateWithIndex(newIndex);

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, WAIT_BEFORE_NEXT_STATE_CHANGE);
    }

    // If scrolling downwards with enough force, go forward a state
    if (e.deltaY <= -FORCE_THRESHOLD) {
      var newIndex = $state.current.data.index + 1;
      stateUtils.goToStateWithIndex(newIndex);

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, WAIT_BEFORE_NEXT_STATE_CHANGE);
    }
  });

  $rootScope.$on('$stateChangeSuccess', function() {
      scrollProgress.halt();
      var newIndex = $state.current.data.index;
      scrollProgress.set((newIndex * 100) + 50, {duration: 500});
  });

});
