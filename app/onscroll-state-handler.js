angular.module('famous-angular')

.run(function($rootScope, $famous, $timeline, $state) {
  $rootScope.bodyHeight = 5000;

  var rangePerState = 100;
  var stateCount = 7;
  var scrollStates = [
    { max: 100, name: 'intro' },
    { max: 200, name: '1' },
    { max: 300, name: '2' },
    { max: 400, name: '3' },
    { max: 500, name: '4' },
    { max: 600, name: '5' }
  ];

  window.onscroll = function() {
    var t = getTimelineFromScroll();
    determineState(t);
  };

  function getTimelineFromScroll() {
    var pageYOffset = window.pageYOffset;
    var scrollMax = $rootScope.bodyHeight - window.innerHeight;

    // Scale the scroll range to a simple timeline of [0, n * 100]
    t = $timeline([
      [0, 0, function(x) { return x }],
      [scrollMax, (stateCount - 1) * rangePerState]
    ])(pageYOffset);

    return t;
  }

  function determineState(t) {
    for (var i = 0; i < scrollStates.length; i++) {
      var state = scrollStates[i];
      if (t < state.max) {
        $state.go(state.name);
        break;
      }
    }
  }
  
  //$rootScope.$on('$stateChangeSuccess', function(e) {
    //var newState = $state.current;

    //for (var i = 0; i < scrollStates.length; i++) {
      //var state = scrollStates[i];
      //if (newState.name === state.name) {
        //console.log(state.name);
        //var beginningOfStateRange = state.max - (rangePerState / 2);
        //window.scrollTo(0, beginningOfStateRange);
        //break;
      //}
    //}

    //console.log(window.pageYOffset);
  //});

});
