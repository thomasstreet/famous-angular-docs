angular.module('famous-angular')

.controller('state3Ctrl', function($scope, $famous, $timeline, stateTransitions) {

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

  $scope.content = {
    translate: function() {
      return $timeline([
        [0, [-1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 0, 0]]
      ])(t.get());
    }
  };

  $scope.code = {
    translate: function() {
      return $timeline([
        [0.2, [0, 1000, 0], Easing.inOutQuart],
        [0.3, [0, 100, 0]]
      ])(t.get());
    }
  };

  $scope.inputRange = {
    translate: function() {
      return $timeline([
        [0, [1000, 0, 0], Easing.inOutQuart],
        [0.2, [0, 320, 0]]
      ])(t.get());
    }
  };

  $scope.data = {
    repeatCount: 1
  };

  $scope.cats = [{}];

  $scope.$watch('data.repeatCount', function(newVal, oldVal) {
    if (newVal) {
      $scope.cats = [];
      for (var i = 0; i < Number(newVal); i++) {
        $scope.cats.push(catData[i]);
      }
    }
  });

  $scope.catTile = {
    translate: function($index) {
      return $timeline([
        [0.2, [0, 1000, 0], Easing.inOutQuart],
        [0.3, [$index >= 4 ? 205 : 0, ($index % 4) * 80, 0]]
      ])(t.get());
    }
  };

  var catData = [
    {
      picture: 'img/cats/cat1.png',
      name: 'Rocco',
      location: 'Seattle, WA'
    },
    {
      picture: 'img/cats/cat2.png',
      name: 'Tabby',
      location: 'Phoenix, AR'
    },
    {
      picture: 'img/cats/cat3.png',
      name: 'Meiska',
      location: 'Reston, VA'
    },
    {
      picture: 'img/cats/cat4.png',
      name: 'Fat Max',
      location: 'San Francisco, CA'
    },
    {
      picture: 'img/cats/cat5.png',
      name: 'Izzy',
      location: 'Atlanta, GA'
    },
    {
      picture: 'img/cats/cat6.png',
      name: 'Powder',
      location: 'Seattle, WA'
    },
    {
      picture: 'img/cats/cat7.png',
      name: 'David',
      location: 'Salem, OR'
    },
    {
      picture: 'img/cats/cat8.png',
      name: 'Maggie',
      location: 'Orlando, FL'
    }
  ];

});
