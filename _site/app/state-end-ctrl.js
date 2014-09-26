angular.module('famous-angular')

.controller('stateEndCtrl', function($scope, $http, $famous, $timeline, stateTransitions) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.minified = true;

  $scope.toggleMinified = function() {
    $scope.minified = !$scope.minified;
  };

  $scope.jsCDN = function() {
    return $scope.minified ? js.minified : js.unminified;
  };

  $scope.cssCDN = function() {
    return $scope.minified ? css.minified : css.unminified;
  };

  var js = {
    minified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.min.js',
    unminified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.js'
  };

  var css = {
    minified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.min.css',
    unminified: 'https://code.famo.us/integrations/angular/2.0.2/famous-angular.css'
  };


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

  $scope.container = {
    translate: $timeline([
      [0, [0, 200, 0], Easing.inOutQuart],
      [0.2, [0, 310, 0]],
      [1.6, [0, 310, 0], Easing.outQuad],
      [2, [0, 200, 200]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 1, Easing.inCubic],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };


  $scope.download = {
    text: {
      translate: $timeline([
        [0, [0, 400, 0]],
        [0.1, [0, 400, 0], Easing.inOutQuart],
        [0.3, [-465, 350, 0]],
        [1.6, [-465, 350, 0], Easing.outQuad],
        [2, [0, -200, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.1, 0, Easing.inCubic],
        [0.3, 1],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    },
    button: {
      translate: $timeline([
        [0, [0, 400, 0]],
        [0.1, [0, 400, 0], Easing.inOutQuart],
        [0.3, [-465, 460, 0]],
        [1.6, [-465, 460, 0], Easing.outQuad],
        [2, [0, -200, 0]]
      ]),
      opacity: $timeline([
        [0, 0],
        [0.1, 0, Easing.inCubic],
        [0.3, 1],
        [1.8, 1, Easing.inOutQuart],
        [2, 0]
      ])
    }
  };

  $scope.cdn = {
    translate: $timeline([
      [0, [785, 200, 0], Easing.inOutQuart],
      [0.2, [785, 350, 0]],
      [1.6, [785, 350, 0], Easing.outQuad],
      [2, [0, 200, 200]]
    ]),
    opacity: $timeline([
      [0, 0],
      [0.2, 0, Easing.outCubic],
      [0.4, 1],
      [1.8, 1, Easing.inOutQuart],
      [2, 0]
    ])
  };

});
