angular.module('famous-angular')

.controller('StateEndCtrl', function($scope, $famous, $timeline) {
  var Easing = $famous['famous/transitions/Easing'];
  var Transitionable = $famous['famous/transitions/Transitionable'];

/*--------------------------------------------------------------*/

  $scope.gravity = {
    translate: $timeline([
      [6, [0, 0, -100]],
      [6.5, [0, 0, 0]],
      [7, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [6, 0, Easing.inQuad],
      [6.5, 1, Easing.outQuad],
      [7, 0],
    ])
  };

});
