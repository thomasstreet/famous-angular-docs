angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.scroll = new Transitionable(0);

  $scope.translate = $timeline([
    [0, [0, 0, 0], Easing.inOutQuart],
    [200, [1000, 0, 0]]
  ]);

  window.onscroll = function(e) {
    var scroll = window.pageYOffset;
    $scope.scroll.set(scroll);
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [200, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.frame = {
    translate: function() {
      return $timeline([
        [150, [0, -1000, 0], Easing.inOutQuart],
        [200, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.header = {
    translate: function() {
      return $timeline([
        [200, [0, -1000, 0], Easing.inOutQuart],
        [250, [10, 50, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.sidenav = {
    translate: function() {
      return $timeline([
        [250, [0, 1000, 0], Easing.inOutQuart],
        [300, [10, 90, 0]]
      ])($scope.scroll.get());
    }
  };

});
