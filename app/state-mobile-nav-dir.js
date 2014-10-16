angular.module('famous-angular')

.directive('mobileNav', function() { 
  return {
    scope: false,
    restrict: 'E',
    controller: 'MobileNavCtrl',
    templateUrl: 'build/templates/state-mobile-nav.html'
  };
})

.controller('MobileNavCtrl', function($rootScope, $scope, $famous, $timeline, stateScrollUtils, $media) {
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  $scope.containerSurfaceOptions = {
    classes: ['set-nav-perspective'],
    size: [undefined, 150]
  };

/*--------------------------------------------------------------*/

  $scope.t = new Transitionable(0);

  $(window).bind('scroll', function() {
    $scope.t.halt();
    var t = getTimelineFromScroll();
    $scope.t.set(t, {duration: 0});
  });

  function getTimelineFromScroll() {
    var scrollMax = stateScrollUtils.scrollMax();
    var stateCount = stateScrollUtils.stateCount();
    var halfOfScrollRange = scrollMax / stateCount / 2;

    var scaleScroll = $timeline([
      [halfOfScrollRange, 0],
      [scrollMax - halfOfScrollRange, 6]
    ]);

    var scrollPosition = window.pageYOffset;
    return scaleScroll(scrollPosition);
  }

  window.setPointer = function(num) {
    $scope.t.set(num, {duration: 1600, curve: Easing.outElastic});
  };

  $scope.menuItems = [
    {
      text: 'Render Tree',
      rotateX: $timeline([
        [0, -Math.PI],
        [1, 0],
        [2, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0, Easing.inCubic],
        [1, 1, Easing.outCubic],
        [2, 0]
      ])
    },
    {
      text: 'Data Binding',
      rotateX: $timeline([
        [1, -Math.PI],
        [2, 0],
        [3, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [1, 0],
        [2, 1],
        [3, 0]
      ])
    },
    {
      text: 'Angular Directives',
      rotateX: $timeline([
        [2, -Math.PI],
        [3, 0],
        [4, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [2, 0],
        [3, 1],
        [4, 0]
      ])
    },
    {
      text: 'Organization',
      rotateX: $timeline([
        [3, -Math.PI],
        [4, 0],
        [5, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [3, 0],
        [4, 1],
        [5, 0]
      ])
    },
    {
      text: 'No Compromises',
      rotateX: $timeline([
        [4, -Math.PI],
        [5, 0],
        [6, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [4, 0],
        [5, 1],
        [6, 0]
      ])
    },
    {
      text: 'Download',
      rotateX: $timeline([
        [5, -Math.PI],
        [6, 0],
        [7, Math.PI]
      ]),
      opacity: $timeline([
        [0, 0],
        [5, 0],
        [6, 1],
        [7, 0]
      ])
    }
  ];

});
