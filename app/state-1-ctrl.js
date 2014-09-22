angular.module('famous-angular')

.controller('state1Ctrl', function($scope, $famous, $timeline, stateTransitions) {
  console.log('state1');

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.opacity = function() {
    return $timeline([
      [0, 0, Easing.inOutQuart],
      [1, 1]
    ])(t.get());
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    frame: {
      translate: function() {
        return $timeline([
          [0.3, [0, 1000, 0], Easing.inOutQuart],
          [0.5, [0, 100, 0]]
        ])(t.get());
      }
    },

    header: {
      translate: function() {
        return $timeline([
          [0.4, [0, 1000, 0], Easing.inOutQuart],
          [0.6, [0, 120, 0]]
        ])(t.get());
      }
    },

    sidenav: {
      translate: function() {
        return $timeline([
          [0.5, [0, -1000, 0], Easing.inOutQuart],
          [0.7, [0, 140, 0]]
        ])(t.get());
      }
    },

    container: {
      translate: function() {
        return $timeline([
          [0.6, [-1000, 0, 0], Easing.inOutQuart],
          [0.8, [0, 160, 0]]
        ])(t.get());
      }
    },

    content: {
      translate: function() {
        return $timeline([
          [0.7, [-1000, 0, 0], Easing.inOutQuart],
          [0.9, [0, 180, 0]]
        ])(t.get());
      }
    }
  };


  $scope.example = {
    frame: {
      translate: function() {
        return $timeline([
          [0.3, [0, -1000, 0], Easing.inOutQuart],
          [0.5, [0, 0, 0]]
        ])(t.get());
      }
    },

    header: {
      translate: function() {
        return $timeline([
          [0.4, [0, -1000, 0], Easing.inOutQuart],
          [0.6, [10, 50, 0]]
        ])(t.get());
      }
    },

    sidenav: {
      translate: function() {
        return $timeline([
          [0.5, [0, 1000, 0], function(x) { return x }],
          [0.7, [10, 90, 0]]
        ])(t.get());
      }
    },

    container: {
      translate: function() {
        return $timeline([
          [0.6, [1000, 90, 0], function(x) { return x }],
          [0.8, [70, 90, 0]]
        ])(t.get());
      }
    },

    content: {
      translate: function() {
        return [90, 110, 0];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
      scale: function() {
        return $timeline([
          [0.7, [0.1, 0.1], Easing.inOutQuart],
          [1, [1, 1]]
        ])(t.get());
      }
    }
  };

});
