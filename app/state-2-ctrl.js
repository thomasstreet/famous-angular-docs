angular.module('famous-angular')

.controller('state2Ctrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $interval, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.data = {
    name: '',
    t: 1
  };

/*--------------------------------------------------------------*/

  $scope.gravity = {
    translate: $timeline([
      [2, [0, 0, -100]],
      [2.5, [0, 0, 0]],
      [3, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [2, 0, Easing.inQuad],
      [2.5, 1, Easing.outQuad],
      [3, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      var text = 'Angular'.split('');

      for (var i = 0; i < text.length; i++) {
        setTimeout(function(index) {
          return function() {
            $scope.data.name = $scope.data.name + text[index];
            $scope.$digest();
          };
        }(i), 120 * i);
      }

      setTimeout(function() {
        playAnimation();
      }, 1000);

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

  $media.$sheet('State2Sheet', {

    xs: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [75, 310, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [10, 140, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code': {
        transform: function() {
          var translate = $timeline([
            [0.2, [0, 485, 0], Easing.outQuad],
            [0.4, [0, 685, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0.2, 0, Easing.inQuad],
            [0.4, 1]
          ])(t.get());
        }
      }
    },


    sm: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [250, 190, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [1020, 180, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code': {
        transform: function() {
          var translate = $timeline([
            [0.2, [0, 0, 0], Easing.outQuad],
            [0.4, [0, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      }
    }

  });


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

/*--------------------------------------------------------------*/

  window.data = $scope.data;

  $scope.entireCard = {
    animation: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        var depth = $timeline([
          [1, [0, 0, 0]],
          [25, [0, 0, 0], Easing.inQuad],
          [40, [0, -200, 0]],
          [43, [0, -200, 0], Easing.outQuad],
          [60, [0, 0, 0]],
        ])(sliderT);
        return depth;
      },
      rotate: function(sliderT) {
        sliderT = parseInt(sliderT);
        var rotate = $timeline([
          [1, 0],
          //[100, 2 * Math.PI]
        ])(sliderT);
        return rotate;
      },
      scale: function(sliderT) {
        sliderT = parseInt(sliderT);
        var scale = $timeline([
          [1, [1, 1], Easing.inQuad],
          [20, [1.3, 0.3], Easing.inOutQuad],
          [40, [1, 1], Easing.outQuad],
          [56, [1, 1], Easing.outQuad],
          [65, [1.15, 0.75]],
          [68, [1.15, 0.75], Easing.outElastic],
          [100, [1, 1]],
        ])(sliderT);
        return scale;
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
          [1, [0, -245, 2], Easing.inQuad],
          [50, [0, -245, 2], Easing.outQuad],
          [100, [0, -245, 2]]
        ])(sliderT);
      },
    },

    stripe: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, -25, 3], Easing.inQuad],
          [50, [0, -25, 3], Easing.outQuad],
          [100, [0, -25, 3]]
        ])(sliderT);
      },
    },

    name: {
      translate: function(sliderT) {
        sliderT = parseInt(sliderT);
        return $timeline([
          [1, [0, 25, 4], Easing.inQuad],
          [50, [0, 25, 4], Easing.outQuad],
          [100, [0, 25, 4]]
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
