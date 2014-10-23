angular.module('famous-angular')

.run(function($rootScope, $famous, $state, stateUtils, $timeline) {
  var Easing = $famous['famous/transitions/Easing'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var progressTimeline = new Transitionable(0);
  $rootScope.progressTimeline = progressTimeline;

  var gravityTimeline = new Transitionable(0);
  $rootScope.gravityTimeline = gravityTimeline;

  var initialPageLoad = true;

  var gravityTimeout;

  $rootScope.$on('$stateChangeSuccess', function() {
    if (gravityTimeout) clearGravityTimeout();
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    if (gravityTimeout) clearGravityTimeout();

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
  var haltScrollEvents;

  $(window).on('mousewheel', {
    mousewheel: {
      debounce: true,
      throttle: true
    }
  }, function(e) {
    if (haltScrollEvents) return;

    e.deltaY = correctDeltaY(e.deltaY);
    adjustTimelines(e.deltaY);
  });

  function correctDeltaY(deltaY) {
    // Normally 'scrolling' down === -e.deltaY.  But when scrolling down,
    // we want to move the page forward.  Invert the original e.deltaY so that
    // when talking about moving forward, we can use positive numbers.
    deltaY = -deltaY;

    // Our ranges for state changes are between [0, 7], so scale e.deltaY
    // appropriately
    deltaY = deltaY / 100;

    var MAXIMUM_SCROLL_DISTANCE = 0.03;
    // Force a range of [-MAXIMUM_SCROLL_DISTANCE, MAXIUM_SCROLL_DISTANCE]
    deltaY = Math.min(MAXIMUM_SCROLL_DISTANCE, deltaY);
    deltaY = Math.max(-MAXIMUM_SCROLL_DISTANCE, deltaY);

    return deltaY;
  }

/*--------------------------------------------------------------*/

  var previousPageY;
  
  $(document).bind('touchstart', function(e) {
    previousPageY = e.originalEvent.touches[0].pageY;
  });

  $(document).bind('touchmove', function(e) {
    e.preventDefault();

    if (haltScrollEvents) return;

    // If the target is an HTML Input Element (e.g. an input range slider),
    // don't adjust timelines
    if (/Input/.test(e.target.toString())) return;

    var delta = previousPageY - e.originalEvent.touches[0].pageY;

    previousPageY = e.originalEvent.touches[0].pageY;


    if (Math.abs(delta) > 30) {
      haltAdditionalScrollEvents();
      changeState(delta);
      return;
    }

    var deltaY = $timeline([
      [-100, -1],
      [0, 0],
      [100, 1]
    ])(delta);

    adjustTimelines(deltaY);
  });

/*--------------------------------------------------------------*/

  var DISABLE_EVENTS_MS = 1000;

  function adjustTimelines(deltaY) {

    var startingPoint = $state.current.data.index + 0.5;

    var newProgressValue = cappedProgressValue(deltaY, startingPoint);

    updateTimelines(newProgressValue);

    // Trigger the gravity effect after the last scroll event has finished
    if (gravityTimeout) clearGravityTimeout();

    if (traveledFarEnoughForStateChange(newProgressValue)) {
      changeState(deltaY); 
      haltAdditionalScrollEvents();
    } else {
      var delayUntilGravitySnap = 300;
      gravityTimeout = setTimeout(function() {
        triggerGravityEffect(startingPoint);
        clearGravityTimeout();
      }, delayUntilGravitySnap);
    }

  }


  // Cap the newProgerssValue
  // If state index is 3, keep the new progress value between [2.5 and 4.5];
  function cappedProgressValue(deltaY, startingPoint) {
    var newProgressValue = progressTimeline.get() + deltaY;
    newProgressValue = Math.max(startingPoint - 1, newProgressValue);
    newProgressValue = Math.min(startingPoint + 1, newProgressValue);
    return newProgressValue;
  }


  function updateTimelines(newProgressValue) {
    progressTimeline.halt();
    progressTimeline.set(newProgressValue, { duration: 0 });
    gravityTimeline.halt();
    gravityTimeline.set(newProgressValue, { duration: 0 });
  }


  function traveledFarEnoughForStateChange(newProgressValue) {
    // If scrolling past max range, halt additional scroll events and trigger
    // the gravity effect.
    var maxRange = $rootScope.isMobile() ? [0.1, 6.9] : [0, 7];
    if (newProgressValue <= maxRange[0] || newProgressValue >= maxRange[1]) {
      haltAdditionalScrollEvents();
      return false;
    }

    var progressValueStartingPoint = ($state.current.data.index + 0.5);
    var delta = Math.abs(newProgressValue - progressValueStartingPoint);
    var threshold = $rootScope.isMobile() ? 0.4 : 1;
    return delta >= threshold;
  }


  function triggerGravityEffect(startingPoint) {
      progressTimeline.halt();
      progressTimeline.set(startingPoint, { duration: 200 });
      gravityTimeline.halt();
      gravityTimeline.set(startingPoint, { duration: 1500, curve: Easing.outElastic });
  }


  function changeState(deltaY) {
    var direction = deltaY > 0 ? 'forward' : 'backwards';
    var indexChange = direction === 'forward' ? 1 : -1;
    var currentStateIndex = $state.current.data.index;
    if (gravityTimeout) clearGravityTimeout();
    stateUtils.goToStateWithIndex(currentStateIndex + indexChange);
  }


  function haltAdditionalScrollEvents() {
    haltScrollEvents = true;
    setTimeout(function() {
      haltScrollEvents = false;
    }, DISABLE_EVENTS_MS);
  }


  function clearGravityTimeout() {
    clearTimeout(gravityTimeout);
    gravityTimeout = null;
  }

});
