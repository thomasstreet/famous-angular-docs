angular.module('famous-angular')

.directive('square', function($famous) {
  var Transform = $famous['famous/core/Transform'];
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var SnapTransition = $famous['famous/transitions/SnapTransition'];

  var flipOut = Transform.rotateZ(Math.PI / 2);
  var flipIn  = Transform.inverse(flipOut);

  return {
    restrict: 'A',
    priority: 3,
    link: function(scope, element, attrs) {

      function translateSquare(index) {
        return (index || 0) * 75;
      }

      var transform = new Transitionable(Transform.multiply(
        Transform.translate(translateSquare(scope.$index % 4), Math.floor(scope.$index / 4) * 60 + 40, 0),
        flipOut
      ));

      var opacity = new Transitionable(0);

      function enter() {
        transform.set(Transform.multiply(transform.get(), flipIn), {
          duration: 250,
          transition: SnapTransition
        });

        opacity.set(1, {duration: 250, curve: 'easeOut'});

        return 250;
      };

      function leave() {
        transform.set(Transform.multiply(transform.get(), flipOut), {
          duration: 250,
          transition: SnapTransition
        });

        opacity.set(0, {duration: 250, curve: 'easeIn'});

        return 250;
      };

      function halt() {
        scope.transform.halt();
      };

      angular.extend(scope, {
        enter: enter,
        leave: leave,
        halt: halt,
        opacity: opacity,
        transform: transform
      });
    }
  }
});
