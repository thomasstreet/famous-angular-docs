angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $http, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.arrowAnimation = new Transitionable(0);

  window.set = function() {
    $scope.arrowAnimation.set(1, {duration: 1000}, function() {
      $scope.arrowAnimation.set(0, {duration: 0}, function() {
        setTimeout(window.set, 1000);
      });
    });
  };

  //window.set();

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, $done);
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
      [2, [0, 200, 200]]
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
      [2, [0, -200, 0]]
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
      [2, [0, -200, 0]]
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
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.5, 0],
        [0.7, 1],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    },
    github: {
      rotateX: $timeline([
        [0, -Math.PI / 2],
        [0.3, -Math.PI / 2, Easing.outElastic],
        [1, 0],
        [1.5, 0, Easing.inOutQuart],
        [2, Math.PI]
      ]),
      translate: $timeline([
        [0, [0, 490, 0]],
        [0.3, [0, 490, 0], Easing.inOutQuart],
        //[0.5, [0, 490, 0]],
        [1.6, [0, 490, 0], Easing.outQuad],
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 0, Easing.inCubic],
        [0.4, 1],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    },
    docs: {
      translate: $timeline([
        [0, [0, 490, 0]],
        [0.5, [0, 490, 0], Easing.inOutQuart],
        [0.7, [300, 490, 0]],
        [1.6, [300, 490, 0], Easing.outQuad],
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.5, 0],
        [0.7, 1, Easing.inCubic],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    }
  };

  $scope.builtBy = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 685, 0]],
      [1.6, [0, 685, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.scrollMessage = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 770, 0]],
      [1.6, [0, 770, 0], Easing.outQuad],
      [2, [0, -200, 1000]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.downArrow = {
    animation: $timeline([
      [0, [0, 0, 0], Easing.outBounce],
      [1, [0, 30, 0]],
    ]),
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 885, 0]],
      [1.6, [0, 885, 0], Easing.outQuad],
      [2, [0, 755, 1000]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

});
