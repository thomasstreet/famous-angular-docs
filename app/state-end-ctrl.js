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

  $scope.entireView = {
    opacity: $timeline([
      [0, 0, Easing.inOutQuart],
      [0.5, 1],
      [1, 1, Easing.inOutQuart],
      [2, 0]
    ]),
    translate: $timeline([
      [0, [0, 750, 0], Easing.outBack],
      [1, [0, 750, 0], Easing.inOutQuart],
      [2, [0, 750, 0]]
    ])
  };


/*--------------------------------------------------------------*/

  $scope.container = {
    translate: $timeline([
      [0.2, [0, 310, 0], Easing.inOutQuart],
      [0.5, [0, 310, 0]],
    ]),
    opacity: $timeline([
      [0, 1],
      //[0.2, 0],
      //[0.5, 1, Easing.inCubic],
    ])
  };


  $scope.download = {
    text: {
      translate: $timeline([
        [0, [-465, 350, 1]],
        [0.3, [-465, 350, 1], Easing.inOutQuart],
        [0.6, [-465, 350, 1]],
      ]),
      opacity: $timeline([
        [0, 1],
        //[0, 0],
        //[0.3, 0, Easing.inCubic],
        //[0.6, 1],
      ])
    },
    button: {
      translate: $timeline([
        [0, [-465, 460, 2]],
        [0.4, [-465, 460, 2], Easing.inOutQuart],
        [0.7, [-465, 460, 2]],
      ]),
      opacity: $timeline([
        [0, 1],
        //[0, 0],
        //[0.4, 0, Easing.inCubic],
        //[0.7, 1],
      ])
    }
  };

  $scope.cdn = {
    translate: $timeline([
      [0, [245, 350, 2]],
      [0.5, [245, 350, 2], Easing.inOutQuart],
      [0.8, [245, 350, 2]],
    ]),
    opacity: $timeline([
      [0, 1],
      //[0, 0],
      //[0.5, 0, Easing.outCubic],
      //[0.8, 1],
    ])
  };

});
