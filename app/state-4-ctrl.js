angular.module('famous-angular')

.controller('state4Ctrl', function($rootScope, $scope, $state, $famous, $timeline, stateTransitions, scrollGravity, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

/*--------------------------------------------------------------*/

  $scope.gravity = scrollGravity.timelines;
  $scope.grav = new Transitionable(50);

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    scrollGravity.setState({
      grav: $scope.grav,
      startPosition: window.pageYOffset
    });

    stateTransitions.enter(t, function() {
      $done();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $media.$sheet('State4Sheet', {

    xs: {
      '#heading': {
        transform: function() {
          var translate = $timeline([
            [0, [0, 80, -150], Easing.outQuad],
            [0.2, [0, 80, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0, Easing.inQuart],
            [0.2, 1]
          ])(t.get());
        },
        align: function() {
          return [0.5, 0];
        },
        origin: function() {
          return [0.5, 0];
        },
      },

      '#routing-image': {
        transform: function() {
          var translate = $timeline([
            [0, [10, 970, 0], Easing.outBack],
            [0.2, [10, 970, 0], Easing.outBack],
            [0.5, [10, 740, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
           [0, 0, Easing.outCubic],
           [0.2, 0, Easing.outCubic],
           [0.5, 1]
          ])(t.get());
        },
      },

      '#routing-text': {
        transform: function() {
          var translate = $timeline([
            [0, [100, 1330, 0], Easing.outBack],
            [0.25, [100, 1330, 0], Easing.outBack],
            [0.55, [100, 980, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.25, 0],
            [0.55, 1]
          ])(t.get());
        }
      },

      '#dependency-image': {
        transform: function() {
          var translate = $timeline([
            [0, [210, 575, 0], Easing.outBack],
            [0.35, [210, 575, 0], Easing.outBack],
            [0.65, [210, 285, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.35, 0],
            [0.65, 1]
          ])(t.get());
        }
      },

      '#dependency-text': {
        transform: function() {
          var translate = $timeline([
            [0, [185, 935, 0], Easing.outBack],
            [0.30, [185, 935, 0], Easing.outBack],
            [0.60, [185, 585, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.30, 0],
            [0.60, 1]
          ])(t.get());
        },
      },

      '#modules-image': {
        transform: function() {
          var translate = $timeline([
            [0, [440, 1020, 0], Easing.outBack],
            [0.5, [440, 1020, 0], Easing.outBack],
            [0.8, [440, 720, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.5, 0],
            [0.8, 1]
          ])(t.get());
        }
      },

      '#modules-text': {
        transform: function() {
          var translate = $timeline([
            [0, [510, 1330, 0], Easing.outBack],
            [0.45, [510, 1330, 0], Easing.outBack],
            [0.75, [510, 980, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0, 0],
            [0.45, 0],
            [0.75, 1]
          ])(t.get());
        },
      },


    },




    /*--------------------------------------------------------------*/

    sm: {
      '#heading': {
        transform: function() {
          var translate = $timeline([
            [0, [0, 150, -150], Easing.outQuad],
            [0.2, [0, 150, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },

      '#routing-image': {
        transform: function() {
          var translate = $timeline([
            [0, [140, 600, 0], Easing.outBack],
            [0.2, [140, 600, 0], Easing.outBack],
            [0.5, [140, 370, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },

      '#routing-text': {
        transform: function() {
          var translate = $timeline([
            [0, [270, 1030, 0], Easing.outBack],
            [0.25, [270, 1030, 0], Easing.outBack],
            [0.55, [270, 680, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },

      '#dependency-text': {
        transform: function() {
          var translate = $timeline([
            [0, [750, 1030, 0], Easing.outBack],
            [0.30, [750, 1030, 0], Easing.outBack],
            [0.60, [750, 680, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },

      '#dependency-image': {
        transform: function() {
          var translate = $timeline([
            [0, [750, 600, 0], Easing.outBack],
            [0.35, [750, 600, 0], Easing.outBack],
            [0.65, [750, 310, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },

      '#modules-image': {
        transform: function() {
          var translate = $timeline([
            [0, [1320, 630, 0], Easing.outBack],
            [0.5, [1320, 630, 0], Easing.outBack],
            [0.8, [1320, 330, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },

      '#modules-text': {
        transform: function() {
          var translate = $timeline([
            [0, [1430, 1030, 0], Easing.outBack],
            [0.45, [1430, 1030, 0], Easing.outBack],
            [0.75, [1430, 680, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },

    },

  });



  $scope.routing = {
   text: {
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.25, [0.2, 0.2], Easing.outBack],
       [0.55, [1, 1]]
     ])
   },
  };

  $scope.dependency = {
   text: {
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.30, [0.2, 0.2], Easing.outBack],
       [0.60, [1, 1]]
     ]),
   },
  };

  $scope.modules = {
   text: {
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.45, [0.2, 0.2], Easing.outBack],
       [0.75, [1, 1]]
     ]),
   }
  };

});
