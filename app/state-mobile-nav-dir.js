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
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var navTimeline = new Transitionable(0);
  $scope.navTimeline = navTimeline;
  $scope.scrollProgress = stateScrollUtils.scrollProgress();

  $scope.navOptions = {
    classes: ['set-nav-perspective'],
    size: [undefined, 150]
  };

/*--------------------------------------------------------------*/

  $(window).bind('scroll', function() {
    _pointer.halt();
    var t = getTimelineFromScroll();
    _pointer.set(t, {duration: 300});
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

  $scope.opacity = function() {
    return $timeline([
      [0, 0],
      [1, 1],
    ])(_pointer.get());
  };


  var _pointer = new Transitionable(0);
  window.setPointer = function(num) {
    _pointer.set(num, {duration: 300});
  };

  $scope.itemSize = [400, 75];

  $scope.getTranslate = function($index) {
    var position = $index - _pointer.get();
    var xTranslate = position * ($scope.itemSize[0] - 0);
    return [xTranslate, 0, 0];
  };

  $scope.getRotateY = function($index) {
    var position = $index - _pointer.get();
    return (6.28 / 7) * position;
  };

  $scope.getOpacity = function($index) {
    var position = $index - _pointer.get();
    position = Math.abs(position);

    return 1 - position + 0.5;
  };

  $scope.getOrigin = function($index) {
    return [0.5, 0.5];


    var position = $index - _pointer.get();
    var xOrigin = 0.5;

    var cappedPosition = Math.max(Math.min(position, 1), -1);

    xOrigin += -cappedPosition * 0.5;

    console.log('index', $index, 'xOrigin', xOrigin);

    return [xOrigin, 0.5];
  };

  $scope.menuItems = [
    {
      text: 'Intro',
      color: 'blue'
    },
    {
      text: 'Render Tree',
      color: 'red'
    },
    {
      text: 'Data Binding',
      color: 'blue'
    },
    {
      text: 'Angular Directives',
      color: 'red'
    },
    {
      text: 'Organization',
      color: 'blue'
    },
    {
      text: 'No Compromises',
      color: 'red'
    },
    {
      text: 'Download',
      color: 'blue'
    }
  ]


});
