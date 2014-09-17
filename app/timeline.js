angular.module('famous-angular')

.run(function($rootScope, scroll) {
  $rootScope.bodyHeight = 5000;
})

.factory('scroll', function($rootScope, $famous, $timeline, $state) {
  console.log('scroll loaded');
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var scroll = 0;
  var rangePerState = 100;
  var stateCount = 7;

  window.onscroll = onscrollHandler;
  onscrollHandler();

  function onscrollHandler() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight;

    // Scale the scroll range to a simple 0-1000 range
    scroll = $timeline([
      [0, 0, function(x) { return x }],
      [scrollMax, (stateCount - 1) * rangePerState]
    ])(pageYOffset);

    determineState(scroll);
  }

  function determineState(scroll) {
    if (scroll < 100) {
      $('#state-1').css('opacity', 0);
      $state.go('intro');
    } else if (scroll < 200) {
      $state.go('1');
    }
  }

  return {
    get: function() {
      // Only return values in a range of [0, rangePerState]
      return scroll % rangePerState;
    }
  };
});
