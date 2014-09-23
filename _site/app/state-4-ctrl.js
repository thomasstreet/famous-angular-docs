angular.module('famous-angular')

.controller('state4Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.heading = {
    translate: $timeline([
      [0, [-2500, 0, 0], Easing.inOutQuart],
      [0.2, [0, 0, 0]]
    ])
  };


  $scope.routing = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [180, 350, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [310, 630, 0]]
     ])
   }, 
  };

  $scope.dependency = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [760, 310, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [760, 630, 0]]
     ])
   }, 
  };

  $scope.modules = {
   image: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [1320, 330, 0]]
     ])
   }, 
   text: {
     translate: $timeline([
       [0, [-1000, 0, 0], Easing.inOutQuart],
       [0.2, [1430, 630, 0]]
     ])
   }, 
  };

});
