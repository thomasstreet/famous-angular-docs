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
      playAnimation();
      $done();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

   function playAnimation() {
     var repeatAutoplay = $interval(function() {
       if ($scope.data.t + 1 > 100) {
         $interval.cancel(repeatAutoplay);
         return;
       }
       $scope.data.t++;
     }, 1000 / 60);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 75]],
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
      [0, [250, 190, -150], Easing.outQuart],
      [0.3, [250, 190, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1]
    ])
  };

  $scope.rightColumn = {
    translate: $timeline([
      [0, [1020, 180, -150], Easing.outQuart],
      [0.3, [1020, 180, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.rotate = function(sliderT) {
    sliderT = parseInt(sliderT);
    var rotate = $timeline([
      [1, 0, function(x) { return x }],
      [100, 2 * Math.PI]
    ])(sliderT);
    return rotate;
  };

  $scope.entireCard = {
    translate: function(sliderT) {
      sliderT = parseInt(sliderT);
      var depth = $timeline([
        [1, [0, 0, 0]],
        [50, [0, 0, -500]],
        [100, [0, 0, 0]]
      ])(sliderT);
      return depth;
    }
  };

/*--------------------------------------------------------------*/

  $scope.code = {
    translate: $timeline([
      [0.3, [0, 200, 0], Easing.outBounce],
      [0.5, [0, 150, 0]]
    ])
  };


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
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
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
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
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
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
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
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
    },

    inputRange: {
      translate: $timeline([
        [0, [0, 410, 5], Easing.outQuart],
        [0.3, [0, 410, 5]]
      ]),
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
    },

    inputText: {
      translate: $timeline([
        [0, [320, 410, 5], Easing.outQuart],
        [0.3, [320, 410, 5]]
      ]),
      opacity: $timeline([
        [0.8, 0, Easing.inOutQuart],
        [1, 1]
      ])
    }

  };

});
