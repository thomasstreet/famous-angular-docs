angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, scroll) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var opacity = new Transitionable(0);

  $scope.opacity = function() {
    return opacity.get();
  };

  $scope.enter = function($done) {
    opacity.set(1, {duration: 600}, $done);
  };

  $scope.leave = function($done) {
    opacity.set(0, {duration: 400}, $done);
  };

});
