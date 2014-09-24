angular.module('famous-angular')

.controller('stateIntroCtrl', function($scope, $http, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

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
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 80, 0]],
      [1.6, [0, 80, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };


  $scope.heading = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 210, 0]],
      [1.6, [0, 210, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.tagline = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 350, 0]],
      [1.6, [0, 350, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.buttons = {
    download: {
      translate: $timeline([
        [0, [0, -200, 0], Easing.inOutQuart],
        [0.2, [0, -200, 0], Easing.inOutQuart],
        [0.4, [-300, 490, 0]],
        [1.6, [-300, 490, 0], Easing.outQuad],
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 1, Easing.inCubic],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    },
    github: {
      translate: $timeline([
        [0, [0, -200, 0], Easing.inOutQuart],
        [0.2, [0, -200, 0], Easing.inOutQuart],
        [0.4, [0, 490, 0]],
        [1.6, [0, 490, 0], Easing.outQuad],
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 1, Easing.inCubic],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    },
    docs: {
      translate: $timeline([
        [0, [0, -200, 0], Easing.inOutQuart],
        [0.2, [0, -200, 0], Easing.inOutQuart],
        [0.4, [300, 490, 0]],
        [1.6, [300, 490, 0], Easing.outQuad],
        [2, [0, -200, 500]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.3, 1, Easing.inCubic],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    }
  };

  $scope.starsForks = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 600, 0]],
      [1.6, [0, 600, 0], Easing.outQuad],
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
      [0.2, [0, 650, 0]],
      [1.6, [0, 650, 0], Easing.outQuad],
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
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 775, 0]],
      [1.6, [0, 775, 0], Easing.outQuad],
      [2, [0, 755, 1000]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

  $scope.builtBy = {
    translate: $timeline([
      [0, [0, -200, 0], Easing.inOutQuart],
      [0.2, [0, 870, 0]],
      [1.6, [0, 870, 0], Easing.outQuad],
      [2, [0, -200, 0]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

});
