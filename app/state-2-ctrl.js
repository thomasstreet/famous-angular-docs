angular.module('famous-angular')

.controller('state2Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    stateTransitions.enter(t, $done);
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.data = {
    name: 'Angular',
    t: 1
  };

  $scope.rotate = function() {
    var rotate = $timeline([
      [1, 0, function(x) { return x }],
      [100, 2 * Math.PI]
    ])(parseInt($scope.data.t));
    return rotate;
  };

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
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
  };


  $scope.nametag = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [250, 150, 0]]
      ])(t.get());
    },

    body: {
      translate: function() {
        return [0, 0, 1];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    heading: {
      translate: function() {
        return [0, -115, 2];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    stripe: {
      translate: function() {
        return [0, 55, 3];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    name: {
      translate: function() {
        return [0, 35, 4];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    inputRange: {
      translate: function() {
        return [0, 410, 5];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    },

    inputText: {
      translate: function() {
        return [320, 410, 5];
      },
      opacity: function() {
        return $timeline([
          [0.8, 0, Easing.inOutQuart],
          [1, 1]
        ])(t.get());
      },
    }

  };

});
