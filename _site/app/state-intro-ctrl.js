angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, scroll) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.opacity = function() {
    return t.get();
  };

  $scope.enter = function($done) {
    t.delay(600);
    t.set(1, {duration: 600}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: 600}, $done);
  };

});
