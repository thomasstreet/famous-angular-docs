angular.module('famous-angular')

.run(function($rootScope) {
  $rootScope.bodyHeight = 5000;
})

.factory('scroll', function($rootScope, $famous, $timeline) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var scroll = 0;

  window.onscroll = function(e) {
    scroll = window.pageYOffset;
  };

  return {
    get: function() {
      // Scale the scroll range to a simple 0-1000 range
      return $timeline([
        [0, 0],
        [$rootScope.bodyHeight, 1000]
      ])(scroll);
    }
  };

});
