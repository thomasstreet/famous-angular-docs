angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $famous, $timeline, scroll) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var opacity = new Transitionable(0);

  $scope.opacity = function() {
    return opacity.get();
  };

  $scope.testEnter = function($done) {
    console.log('enter');
    $scope.opacity.set(1, {duration: 1000}, $done);
  };

  $scope.leave = function($done) {
    $scope.opacity.set(0, {duration: 1000}, $done);
  };

});
