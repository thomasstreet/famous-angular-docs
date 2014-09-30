angular.module('famous-angular')

.controller('state2Ctrl', function($scope, $famous, $timeline, stateTransitions, $interval) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.data = {
    name: 'Angular',
    t: 1
  };

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      setTimeout(function() {
        playAnimation();
      }, 100);
      $done();
    });
  };

  $scope.leave = function($done) {
    if (animationInterval) {
      $interval.cancel(animationInterval);
    }
    stateTransitions.leave(t, $done);
  };

  var animationInterval;

   function playAnimation() {
     animationInterval = $interval(function() {
       if ($scope.data.t + 1 > 100) {
         $interval.cancel(animationInterval);
         return;
       }
       $scope.data.t++;
     }, 1000 / 60);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.leftColumn = {
    translate: $timeline([
      [0, [250, 190, 0], Easing.outQuart],
      [0.3, [250, 190, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1]
    ])
  };

  $scope.rightColumn = {
    translate: $timeline([
      [0, [1020, 180, 0], Easing.outQuart],
      [0.3, [1020, 180, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -300], Easing.outQuad],
      [0.2, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 1]
    ])
  };

  $scope.code = {
    translate: $timeline([
      [0.2, [0, 0, 0], Easing.outQuad],
      [0.4, [0, 150, 0]]
    ]),
    opacity: $timeline([
      [0.2, 0, Easing.inQuad],
      [0.4, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.rotate = function(sliderT) {
    sliderT = parseInt(sliderT);
    var rotate = $timeline([
      [1, 0],
      [100, 2 * Math.PI]
    ])(sliderT);
    return rotate;
  };

  $scope.entireCard = {
    animation: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        var depth = $timeline([
          [1, [0, 0, 0]],
          [50, [0, 0, -500]],
          [100, [0, 0, 0]]
        ])(sliderT);
        return depth;
      }
    },
    translate: $timeline([
      [0.6, [0, 400, 0], Easing.outBack],
      [0.9, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0.6, 0, Easing.inQuad],
      [0.8, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.nametag = {
    body: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, 0, 1], Easing.inQuad],
          [50, [0, 0, 1], Easing.outQuad],
          [100, [0, 0, 1]]
        ])(sliderT);
      },
    },

    heading: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, -115, 2], Easing.inQuad],
          [50, [0, -115, 100], Easing.outQuad],
          [100, [0, -115, 2]]
        ])(sliderT);
      },
    },

    stripe: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, 55, 3], Easing.inQuad],
          [50, [0, 55, 200], Easing.outQuad],
          [100, [0, 55, 3]]
        ])(sliderT);
      },
    },

    name: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, 35, 4], Easing.inQuad],
          [50, [0, 35, 500], Easing.outQuad],
          [100, [0, 35, 4]]
        ])(sliderT);
      },
    },

    inputRange: {
      translate: $timeline([
        [0.30, [-100, 410, 5], Easing.outCubic],
        [0.60, [0, 410, 5]]
      ]),
      opacity: $timeline([
        [0.30, 0],
        [0.60, 1]
      ])
    },

    inputText: {
      translate: $timeline([
        [0.40, [420, 410, 5], Easing.outCubic],
        [0.70, [320, 410, 5]]
      ]),
      opacity: $timeline([
        [0.40, 0],
        [0.70, 1]
      ])
    }

  };

});
