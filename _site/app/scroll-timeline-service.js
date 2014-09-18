angular.module('famous-angular')

.run(function($rootScope, scroll) {
  $rootScope.bodyHeight = 5000;
})

.factory('scroll', function($rootScope, $famous, $timeline, $state) {
  var rangePerState = 100;
  var stateCount = 7;

  window.onscroll = onscrollHandler;
  onscrollHandler();

  var t = 0;

  function onscrollHandler() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight;

    // Scale the scroll range to a simple timeline of [0, n * 100]
    t = $timeline([
      [0, 0, function(x) { return x }],
      [scrollMax, (stateCount - 1) * rangePerState]
    ])(pageYOffset);

    determineState(t);
  }

  function determineState(t) {

    if (t < 100) {
      $state.go('intro');
    } else if (t < 200) {
      $state.go('1');
    } else if (t < 300) {
      $state.go('2');
    } else if (t < 400) {
      $state.go('3');
    } else if (t < 500) {
      $state.go('4');
    } else if (t <= 600) {
      $state.go('5');
    }
  }

  return {
    get: function() {
      // Only return values in a range of [0, rangePerState]
      return t % rangePerState;
    }
  };
});
