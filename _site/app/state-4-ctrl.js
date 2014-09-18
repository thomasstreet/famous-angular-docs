angular.module('famous-angular')

.controller('state4Ctrl', function($scope, $famous, $timeline, stateTransitions) {

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);

  $scope.enter = function($done) {
    t.delay(stateTransitions.enterDelay);
    t.set(1, {duration: 4000}, $done);
  };

  $scope.leave = function($done) {
    t.halt();
    t.set(0, {duration: stateTransitions.leaveDuration}, $done);
  };

  $scope.heading = {
    translate: function() {
      return $timeline([
        [0, [-1500, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };


  $scope.routing = {
   image: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [95, 190, 0]]
       ])(t.get());
     }
   }, 
   text: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [150, 330, 0]]
       ])(t.get());
     }
   }, 
  };

  $scope.dependency = {
   image: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [435, 160, 0]]
       ])(t.get());
     }
   }, 
   text: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [410, 330, 0]]
       ])(t.get());
     }
   }, 
  };

  $scope.modules = {
   image: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [790, 180, 0]]
       ])(t.get());
     }
   }, 
   text: {
     translate: function() {
       return $timeline([
         [0, [-1000, 0, 0], Easing.inOutQuart],
         [0.2, [830, 330, 0]]
       ])(t.get());
     }
   }, 
  };

});
