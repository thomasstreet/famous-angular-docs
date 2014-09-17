angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline, scroll) {

  $('#state-1').css('opacity', 1);

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.scroll = scroll;

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [30, [0, 0, 0]]
      ])($scope.scroll.get());
    }
  };

  $scope.example = {

    frame: {
      translate: function() {
        return $timeline([
          [30, [0, -1000, 0], Easing.inOutQuart],
          [50, [0, 0, 0]]
        ])($scope.scroll.get());
      }
    },

    header: {
      translate: function() {
        return $timeline([
          [50, [0, -1000, 0], Easing.inOutQuart],
          [70, [10, 50, 0]]
        ])($scope.scroll.get());
      }
    },

    sidenav: {
      translate: function() {
        return $timeline([
          [70, [0, 1000, 0], Easing.inOutQuart],
          [80, [10, 90, 0]]
        ])($scope.scroll.get());
      }
    },

    container: {
      translate: function() {
        return $timeline([
          [80, [1000, 90, 0], Easing.inOutQuart],
          [90, [70, 90, 0]]
        ])($scope.scroll.get());
      }
    },

    content: {
      translate: function() {
        return [90, 110, 0];
      },
      opacity: function() {
        return $timeline([
          [93, 0, Easing.inOutQuart],
          [99, 1]
        ])($scope.scroll.get());
      },
      scale: function() {
        return $timeline([
          [90, [0.1, 0.1], Easing.inOutQuart],
          [99, [1, 1]]
        ])($scope.scroll.get());
      }
    }
  
  };

});
