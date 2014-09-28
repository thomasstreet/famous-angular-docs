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
      [0, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.heading = {
    translate: $timeline([
      [0, [0, -100, 0],Easing.outQuad],
      [0.3, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.inQuart],
      [0.3, 1]
    ])
  };


  $scope.routing = {
   text: {
     translate: $timeline([
       [0, [310, 630, 0], Easing.inOutQuart],
       [0.3, [310, 630, 0]]
     ]),
     scale: $timeline([
       [0, [0.2, 0.2], Easing.outBack],
       [0.3, [1, 1]]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [180, 1050, 0], Easing.outBack],
       [0.2, [180, 350, 0]]
     ]),
     opacity: $timeline([
       [0, 0, Easing.outCubic],
       [0.3, 1]
     ])
   },
  };

  $scope.dependency = {
   text: {
     translate: $timeline([
       [0, [750, 630, 0], Easing.inOutQuart],
       [0.2, [750, 630, 0]]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [760, 1010, 0], Easing.outBack],
       [0.2, [760, 310, 0]]
     ]),
     opacity: $timeline([
       [0, 0, Easing.outCubic],
       [0.3, 1]
     ])
   }, 
  };

  $scope.modules = {
   text: {
     translate: $timeline([
       [0, [1430, 630, 0], Easing.inOutQuart],
       [0.2, [1430, 630, 0]]
     ])
   }, 
   image: {
     translate: $timeline([
       [0, [1320, 930, 0], Easing.outBack],
       [0.2, [1320, 330, 0]]
     ]),
     opacity: $timeline([
       [0, 0, Easing.outCubic],
       [0.3, 1]
     ])
   }, 
  };

});
