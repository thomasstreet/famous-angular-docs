angular.module('famous-angular')

.run(function($rootScope, $famous, $state, stateUtils) {
  var Easing = $famous['famous/transitions/Easing'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var progressTimeline = new Transitionable(0);
  $rootScope.progressTimeline = progressTimeline;

  var gravityTimeline = new Transitionable(0);
  $rootScope.gravityTimeline = gravityTimeline;

  var initialPageLoad = true;

  var gravityTimeout;

  $rootScope.$on('$stateChangeSuccess', function() {
    if (gravityTimeout) {
      clearTimeout(gravityTimeout);
      gravityTimeout = null;
    }

    var indexMidpoint = $state.current.data.index + 0.5;
    progressTimeline.set(indexMidpoint, {duration: 500});

    // Wait 200 ms to give Angular time to compile before animating.
    // Otherwise, trying to animate during compilation will cause dropped
    // frames
    gravityTimeline.halt();
    gravityTimeline.delay(initialPageLoad ? 0 : 200);
    gravityTimeline.set(indexMidpoint, {duration: 500});

    if (initialPageLoad) initialPageLoad = false;
  });

/*--------------------------------------------------------------*/

  $(window).on('mousewheel', {
    mousewheel: {
      debounce: true,
      throttle: true
    }
  }, function(e) {
    e.deltaY = correctDeltaY(e.deltaY);
    adjustTimelines(e.deltaY);
  });

/*--------------------------------------------------------------*/

  var startY;
  
  $(window).on('touchstart', function(e) {
    startY = e.originalEvent.touches[0].pageY;
  });

  $(window).on('touchmove', function(e) {
    delta = startY - e.originalEvent.touches[0].pageY;
    console.log(delta);

    //if (Math.abs(delta) < 35) {
      //return;
    //}

    var deltaY = delta / 100;
    if (deltaY > 0) {
      deltaY = 0.03;
    } else {
      deltaY = -0.03;
    }
    adjustTimelines(deltaY);
  });

/*--------------------------------------------------------------*/

  var preventStateChange;
  var DISABLE_EVENTS_MS = 1000;

  function adjustTimelines(deltaY) {
    if (preventStateChange) return;

    var startingPoint = $state.current.data.index + 0.5;

    // Cap the newProgerssValue
    // If state index is 3, keep the new progress value between [2.5 and 4.5];
    var newProgressValue = progressTimeline.get() + deltaY;
    newProgressValue = Math.max(startingPoint - 1, newProgressValue);
    newProgressValue = Math.min(startingPoint + 1, newProgressValue);

    progressTimeline.halt();
    progressTimeline.set(newProgressValue, { duration: 0 });
    gravityTimeline.halt();
    gravityTimeline.set(newProgressValue, { duration: 0 });

    if (gravityTimeout) {
      clearTimeout(gravityTimeout);
      gravityTimeout = null;
    }

    gravityTimeout = setTimeout(function() {
      progressTimeline.halt();
      progressTimeline.set(startingPoint, { duration: 200 });
      gravityTimeline.halt();
      gravityTimeline.set(startingPoint, { duration: 1500, curve: Easing.outElastic });
      clearTimeout(gravityTimeout);
      gravityTimeout = null;
    }, 300);

    if (traveledFarEnoughForStateChange(newProgressValue)) {
      changeState(deltaY); 

      preventStateChange = true;
      setTimeout(function() {
        preventStateChange = false;
      }, DISABLE_EVENTS_MS);
    }
  }



  function correctDeltaY(deltaY) {
    // Normally 'scrolling' down === -e.deltaY.  But when scrolling down,
    // we want to move the page forward.  Invert the original e.deltaY so that
    // when talking about moving forward, we can use positive numbers.
    deltaY = -deltaY;

    // Our ranges for state changes are between [0, 7], so scale e.deltaY
    // appropriately
    deltaY = deltaY / 100;

    var MAXIMUM_SCROLL_DISTANCE = 0.025;
    // Force a range of [-MAXIMUM_SCROLL_DISTANCE, MAXIUM_SCROLL_DISTANCE]
    deltaY = Math.min(MAXIMUM_SCROLL_DISTANCE, deltaY);
    deltaY = Math.max(-MAXIMUM_SCROLL_DISTANCE, deltaY);

    return deltaY;
  }


  function traveledFarEnoughForStateChange(newProgressValue) {
    var progressValueStartingPoint = ($state.current.data.index + 0.5);
    var delta = Math.abs(newProgressValue - progressValueStartingPoint);
    var threshold = $rootScope.isMobile() ? 0.4 : 1;
    return delta >= threshold;
  }


  function changeState(deltaY) {
    var direction = deltaY > 0 ? 'forward' : 'backwards';
    var indexChange = direction === 'forward' ? 1 : -1;
    var currentStateIndex = $state.current.data.index;
    stateUtils.goToStateWithIndex(currentStateIndex + indexChange);
  }

});
