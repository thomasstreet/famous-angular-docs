angular.module('famous-angular')

.controller('state4Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 75]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -150], Easing.outQuad],
      [0.2, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.inQuart],
      [0.2, 1]
    ])
  };


  $scope.routing = {
   text: {
     translate: $timeline([
       [0, [330, 830, 0], Easing.outBack],
       [0.25, [330, 830, 0], Easing.outBack],
       [0.55, [330, 680, 0]]
     ]),
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.25, [0.2, 0.2], Easing.outBack],
       [0.55, [1, 1]]
     ]),
     opacity: $timeline([
       [0, 0],
       [0.25, 0],
       [0.55, 1]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [140, 600, 0], Easing.outBack],
       [0.2, [140, 600, 0], Easing.outBack],
       [0.5, [140, 370, 0]]
     ]),
     opacity: $timeline([
       [0, 0, Easing.outCubic],
       [0.2, 0, Easing.outCubic],
       [0.5, 1]
     ])
   },
  };

  $scope.dependency = {
   text: {
     translate: $timeline([
       [0, [950, 830, 0], Easing.outBack],
       [0.25, [950, 830, 0], Easing.outBack],
       [0.55, [950, 680, 0]]
     ]),
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.25, [0.2, 0.2], Easing.outBack],
       [0.55, [1, 1]]
     ]),
     opacity: $timeline([
       [0, 0],
       [0.25, 0],
       [0.55, 1]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [750, 600, 0], Easing.outBack],
       [0.3, [750, 600, 0], Easing.outBack],
       [0.6, [750, 310, 0]]
     ]),
     opacity: $timeline([
       [0, 0],
       [0.3, 0],
       [0.6, 1]
     ])
   }, 
  };

  $scope.modules = {
   text: {
     translate: $timeline([
       [0, [1510, 830, 0], Easing.outBack],
       [0.35, [1510, 830, 0], Easing.outBack],
       [0.65, [1510, 680, 0]]
     ]),
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.35, [0.2, 0.2], Easing.outBack],
       [0.65, [1, 1]]
     ]),
     opacity: $timeline([
       [0, 0],
       [0.35, 0],
       [0.65, 1]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [1320, 630, 0], Easing.outBack],
       [0.4, [1320, 630, 0], Easing.outBack],
       [0.7, [1320, 330, 0]]
     ]),
     opacity: $timeline([
       [0, 0],
       [0.4, 0],
       [0.7, 1]
     ])
   }, 
  };

});
