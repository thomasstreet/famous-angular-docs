angular.module('famous-angular')

.directive('stateFooter', function() {
  return {
    scope: false,
    restrict: 'E',
    controller: 'FooterCtrl',
    templateUrl: 'build/templates/state-footer.html'
  }
})

.controller('FooterCtrl', function($rootScope, $scope, $famous, $timeline, stateScrollUtils, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var footerTimeline = new Transitionable(0);

/*--------------------------------------------------------------*/

  $media.$sheet('FooterSheet', {
    xs: {
      '#footer': {
        transform: function() {
            var translate = $timeline([
            [0, [0, -40, 0]],
            [1, [0, -40, 0], Easing.outBack],
            [2, [0, -1100, 0], Easing.outBounce],
            [3, [0, -40, 0]]
          ])(footerTimeline.get());
          return Transform.translate.apply(this, translate);
        },
        origin: function() {
          return [0.5, 1];
        },
        align: function() {
          return [0.5, 1];
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [1, 1]
          ])(footerTimeline.get());
        }
      },
    },

    sm: {
      '#footer': {
        transform: function() {
            var translate = $timeline([
            [0, [0, -40, 0]],
            [1, [0, -40, 0], Easing.outBack],
            [2, [0, -770, 0], Easing.outBounce],
            [3, [0, -40, 0]]
          ])(footerTimeline.get());
          return Transform.translate.apply(this, translate);
        },
      },
    }

  });



/*--------------------------------------------------------------*/

  $scope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    footerTimeline.halt();

    var delay = getDelay(fromState) + $rootScope.DELAY_BETWEEN_ENTER_LEAVE_ANIMATIONS;

    footerTimeline.delay(delay);

    if (goingToIntroState()) {
      footerTimeline.set(0, {duration: 400});
      return;
    } 
    
    if (goingToEndState()) {
      footerTimeline.set(1, {duration: 0}, function() {
        footerTimeline.set(2, {duration: 400});
      });
      return;
    }

    if (leavingEndState()) {

      // Use a shorter delay when leaving end state, as end state does not
      // have a leave animation
      footerTimeline.halt();
      footerTimeline.delay(100);

      footerTimeline.set(3, {duration: 700}, function() {
        footerTimeline.set(1, {duration: 0});
      });
      return;
    }

    // If this far, must be a state between 1 - 5, so always show footer/navbar
    footerTimeline.set(1, {duration: 500});
    return;

    function getDelay(prevState) {
      if (!prevState.data) return 0;
      return prevState.data.leaveAnimationDuration;
    }

    function goingToIntroState() {
      return toState.data.index === 0;
    }

    function goingToEndState() {
      return toState.data.index === 6;
    }

    function leavingEndState() {
      if (!fromState.data) return false;
      return fromState.data.index === 6;
    }

  });


});
