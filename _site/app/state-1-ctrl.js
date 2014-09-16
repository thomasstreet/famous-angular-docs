angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline, scroll) {

  $('#state-1').css('opacity', 1);

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.scroll = scroll;
  console.log(scroll.get());

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [30, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.frame = {
    translate: function() {
      return $timeline([
        [30, [0, -1000, 0], Easing.inOutQuart],
        [50, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.header = {
    translate: function() {
      return $timeline([
        [50, [0, -1000, 0], Easing.inOutQuart],
        [70, [10, 50, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.sidenav = {
    translate: function() {
      return $timeline([
        [70, [0, 1000, 0], Easing.inOutQuart],
        [99, [10, 90, 0]]
      ])($scope.scroll.get());
    }
  };

});
