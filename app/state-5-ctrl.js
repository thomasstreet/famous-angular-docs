angular.module('famous-angular')

.controller('State5Ctrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

/*--------------------------------------------------------------*/

  $scope.gravity = {
    translate: $timeline([
      [5, [0, 0, -100]],
      [5.5, [0, 0, 0]],
      [6, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [5, 0],
      [5.3, 1],
      [5.5, 1],
      [5.7, 1],
      [6, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    // Don't initialize hero block at the state5Ctrl invocation, else there
    // will be dropped frames.  Init hero block after main state5 view has
    // been compiled
    setTimeout(function() {
      $scope.showHeroBlock = true;
      $scope.$digest();
    }, 500);

    stateTransitions.enter(t, function() {
      $done();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, function() {
      $done();
    });
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuad],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 1],
      [1, 1],
      [1.8, 0],
    ])
  };

/*--------------------------------------------------------------*/


  $media.$sheet('State5Sheet', {

    xs: {
      '#left-column': {
        transform: function() {
          var scale = $timeline([
            [0, [0.8, 0.8]],
          ])(t.get());
          var scaleMatrix = Transform.scale.apply(this, scale);

          var translate = $timeline([
            [0.3, [80, 655, 0], Easing.outBack],
            [0.6, [80, 395, 0]]
          ])(t.get());
          var translateMatrix = Transform.translate.apply(this, translate);

          return Transform.multiply(scaleMatrix, translateMatrix);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.3, 0],
            [0.5, 1],
          ])(t.get());
        },
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [20, 140, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },
      '#code-block': {
        transform: function() {
          var translate = $timeline([
            [0, [40, 615, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);

        },
        opacity: function() {
          return 1;
        },
      }
    },


    sm: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0.3, [250, 580, 0], Easing.outBack],
            [0.6, [250, 180, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [1170, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code-block': {
        transform: function() {
          var translate = $timeline([
            [0, [0, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return 1;
        },
      }
    }

  });


  $scope.heroBlock = {
    translate: $timeline([
      [0, [84, 110, 2], Easing.inOutQuart],
      [0.2, [84, 110, 2]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.8, 0],
      [1, 1],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -150], Easing.outQuart],
      [0.2, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.outQuart],
      [0.2, 1]
    ])
  };

  $scope.code = {
    top: {
      translate: $timeline([
        [0, [0, 0, 0]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.2, 0],
        [0.4, 1]
      ])
    },
    middle: {
      translate: $timeline([
        [0.8, [-50, 78, 0], Easing.outQuart],
        [1, [31, 78, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.8, 0],
        [1, 1]
      ])
    },
    bottom: {
      translate: $timeline([
        [0, [0, 76, 0]],
        [0.6, [0, 76, 0], Easing.inOutQuart],
        [0.8, [0, 343, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.2, 0],
        [0.4, 1]
      ])
    }
  };

});
