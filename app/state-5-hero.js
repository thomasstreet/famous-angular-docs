'use strict';

angular.module('famous-angular')
  .controller('HeroCtrl', function ($scope, $famous, $timeline) {

    var Transitionable = $famous["famous/transitions/Transitionable"];
    var Easing = $famous["famous/transitions/Easing"];

    $scope.width = 632;
    $scope.height = 236;

    var nRows = 11;
    var nColumns = 30;

    $scope.squares = _.range(nRows * nColumns);

    $scope.mult = function(v1, v2) {
      return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]];
    };

    $scope.add = function(v1, v2) {
      return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
    };

    $scope.t = function() {
      return (Date.now() % 3000) / 1000;
    };

    var subrange = function(start, end) {
      var fn = $timeline([[start, 0, _.identity], [end, 1]]);
      return _.compose(fn, $scope.t);
    };

    $scope.inRange = function(t) {
      return 0 < t && t <= 1;
    };

    $scope.washes = [
      subrange(0, 1),
      subrange(0.8, 1.1),
      subrange(1.1, 1.9),
      subrange(1.3, 2.1),
      subrange(1.4, 2.3),
      subrange(1.8, 2.35),
      subrange(2.30, 3),
    ]

    $scope.spin = $timeline([
      [0, 0, Easing.inOutQuad],
      [1, Math.PI / 2, Easing.inOutQuad]
    ]);

    $scope.getBig = $timeline([
      [0, [0.001, 0.01, 1], Easing.inOutQuad],
      [1, [2, 2, 1], Easing.inOutQuad]
    ]);

    $scope.slideFromRight = $timeline([
      [0, $scope.width, _.identity],
      [1, 0]
    ]);

    $scope.slideFromLeft = $timeline([
      [0, -$scope.width, Easing.outQuad],
      [1, 0]
    ]);


    window.t = $scope.t;

    $scope.stagger = function(i, total) {
        return $timeline([
          [0, 0, _.identity],
          [1, 1]
        ]);
    };

    $scope.makeTriplet = function(x) {
      return [x, x, x];
    };

    $scope.circleScale = function(i) {
      var r = $scope.mult($scope.getBig($scope.washes[3]()),
                         $scope.makeTriplet($scope.stagger(i, 5)))
      return r;
    };


    $scope.colors = {
      blue: "#66D9EF",
      pink: "#F92672",
      green: "#A6E22E",
      orange: "#FD971F",
      purple: "#AE81FF"
    };

    $scope.circleColors = _.values($scope.colors);

  });
