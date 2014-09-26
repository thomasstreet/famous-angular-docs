angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $http, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      // In the callback after enter animation is complete, animate the
      // down arrow
      animateArrow();
      setTimeout(function() {
        animateArrow();
      }, 1700);
      $done();
    });
  };

  $scope.leave = function($done) {
    stateTransitions.leave(t, $done);
  };

/*--------------------------------------------------------------*/

  $scope.opacity = $timeline([
    [0, 0, Easing.inOutQuart],
    [0.5, 1],
    [1, 1, Easing.inOutQuart],
    [2, 0]
  ]);

/*--------------------------------------------------------------*/

  $http({
    method: 'GET',
    url: 'https://api.github.com/repos/famous/famous-angular'
  }).success(function(data) {
    $scope.stars = data.stargazers_count;
    $scope.forks = data.forks;
  });

/*--------------------------------------------------------------*/

  $scope.logo = {
    translate: $timeline([
      [0, [0, 200, 0], Easing.inOutQuart],
      [0.2, [0, 80, 0]],
      [1.6, [0, 80, 0], Easing.outQuad],
      [2, [0, 80, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };


  $scope.heading = {
    translate: $timeline([
      [0, [0, 400, 0]],
      [0.1, [0, 400, 0], Easing.inOutQuart],
      [0.3, [0, 210, 0]],
      [1.6, [0, 210, 0], Easing.outQuad],
      [2, [0, 210, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.1, 0, Easing.inCubic],
      [0.3, 1],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.tagline = {
    translate: $timeline([
      [0, [0, 500, 0]],
      [0.2, [0, 500, 0], Easing.inOutQuart],
      [0.4, [0, 350, 0]],
      [1.6, [0, 350, 0], Easing.outQuad],
      [2, [0, 350, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 0],
      [0.4, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.buttons = {
    download: {
      translate: $timeline([
        [0, [0, 490, 0]],
        [0.5, [0, 490, 0], Easing.inOutQuart],
        [0.7, [-300, 490, 0]],
        [1.6, [-300, 490, 0], Easing.outQuad],
        [2, [-300, 490, 150]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.5, 0],
        [0.7, 1],
        [1.6, 1, Easing.inQuad],
        [1.9, 0]
      ])
    },
    github: {
      rotateX: $timeline([
        [0, -Math.PI / 2],
        [0.3, -Math.PI / 2, Easing.outElastic],
        [1, 0],
        [1.5, 0, Easing.inOutQuart],
        [2, 0]
      ]),
      translate: $timeline([
        [0, [0, 490, 0]],
        [0.3, [0, 490, 0], Easing.inOutQuart],
        //[0.5, [0, 490, 0]],
        [1.6, [0, 490, 0], Easing.outQuad],
        [1.9, [0, 490, 150]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 0, Easing.inCubic],
        [0.4, 1],
        [1.6, 1, Easing.inQuad],
        [1.9, 0]
      ])
    },
    docs: {
      translate: $timeline([
        [0, [0, 490, 0]],
        [0.5, [0, 490, 0], Easing.inOutQuart],
        [0.7, [300, 490, 0]],
        [1.6, [300, 490, 0], Easing.outQuad],
        [2, [300, 490, 150]],
      ]),
      opacity: $timeline([
        [0, 0],
        [0.5, 0],
        [0.7, 1],
        [1.6, 1, Easing.inQuad],
        [2, 0]
      ])
    }
  };

  $scope.builtBy = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 685, 0]],
      [1.6, [0, 685, 0], Easing.outQuad],
      [2, [0, 685, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.6, 1, Easing.inQuad],
      [2, 0]
    ])
  };

  $scope.scrollMessage = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 770, 0]],
      [1.6, [0, 770, 0], Easing.outQuad],
      [2, [0, 770, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.downArrow = {
    animation: {
      translate: $timeline([
        [0, [0, 0, 0], Easing.outQuad],
        [300, [0, 30, 0]],
        [301, [0, -25, 0], Easing.inQuad],
        [600, [0, 0, 0]],
        [1700, [0, 0, 0]]
      ]),
      opacity: $timeline([
        [0, 1, Easing.outQuad],
        [300, 0],
        [301, 0, Easing.outQuad],
        [600, 1],
        [1700, 1]
      ])
    },
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 885, 0]],
      [1.6, [0, 885, 0], Easing.outQuad],
      [2, [0, 855, 150]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.arrowAnimation = new Transitionable(0);

  var loopAnimation;

  function animateArrow() {
    $scope.arrowAnimation.set(0, {duration: 0});
    $scope.arrowAnimation.set(1700, {duration: 1700}, function() {
      if (loopAnimation) {
        animateArrow();
      }
    });
  }

  $scope.startArrowAnimation = function() {
    // Don't start a new loop if already looping
    if (loopAnimation) {
      return;
    }

    loopAnimation = true;
    animateArrow();
  };

  $scope.endArrowAnimation = function() {
    loopAnimation = false;
  };

});
