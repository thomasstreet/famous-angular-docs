function translateSquare(index) {

  return (index || 0) * 75;
}

angular.module('famous-angular', ['famous.angular'])

  .controller('homepageExamplesCtrl', function($scope) {

    $scope.options = {
      grid: {
        dimensions: [2, 2]
      }
    };

    $scope.squares = _.map(_.range(0, 4), function(index) {
      return { x: translateSquare(index) };
    });

    $scope.repeatedItems = 1;
    $scope.modifiers     = [0, 1, 2];

    $scope.data = {
      rangeValue: 0
    };

    $scope.translateX = function(rangeValue) {
      var sliderWidth = 300;
      var leftOffset = -20;
      if (!rangeValue) {
        return 0 + leftOffset;
      }
      return ((Number(rangeValue) / 100) * sliderWidth) + leftOffset;
    };

    $scope.$watch('repeatedItems', function(value) {
      $scope.modifiers = _.range(0, value);
    });

  })
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
        var transform = new Transitionable(Transform.multiply(
          Transform.translate(translateSquare(scope.$index % 4), Math.floor(scope.$index / 4) * 60 + 40, 0),
          flipOut
        ));
        console.log(transform.get());

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
